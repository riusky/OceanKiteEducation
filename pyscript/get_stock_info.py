import adata
import pandas as pd
import psycopg2
from psycopg2 import sql, extras
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 全局配置
DB_CONFIG = {
    'dbname': 'ocean_kite',
    'user': 'postgres',
    'password': 'riusky2025',
    'host': 'localhost',
    'port': 5432
}

TABLE_NAME = 'ok_finance_stock_info'
PREFIX = 'ok_finance_stock_'

def generate_index_name(column_name):
    """生成标准化索引名称：idx_<简化的表名>_<字段名>"""
    stripped_table = TABLE_NAME.replace(PREFIX, "", 1)
    return f"idx_{stripped_table}_{column_name}"

def connect_to_db():
    """连接数据库（保持原有注释）"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("数据库连接成功!")
        return conn
    except Exception as e:
        print(f"数据库连接失败: {e}")
        return None

def create_stock_info_table(conn):
    """创建股票信息表（优化版本）"""
    try:
        with conn.cursor() as cur:
            # 动态建表语句
            cur.execute(sql.SQL("""
                CREATE TABLE IF NOT EXISTS {} (
                    stock_code VARCHAR(64) NOT NULL,
                    short_name VARCHAR(64) NOT NULL,
                    exchange VARCHAR(64) NOT NULL,
                    list_date VARCHAR(64),
                    PRIMARY KEY (stock_code, exchange),
                    CONSTRAINT valid_exchange CHECK (exchange IN ('SH', 'SZ', 'BJ'))
                );
            """).format(sql.Identifier(TABLE_NAME)))

            # 添加表注释
            cur.execute(sql.SQL("COMMENT ON TABLE {} IS '存储股票基本信息'").format(sql.Identifier(TABLE_NAME)))
            
            # 字段注释配置
            comments = {
                'stock_code': '股票代码',
                'short_name': '股票简称',
                'exchange': '交易所代码（SH: 上交所, SZ: 深交所, BJ: 北交所）',
                'list_date': '上市日期（允许空值）'
            }
            for col, comment in comments.items():
                cur.execute(sql.SQL("COMMENT ON COLUMN {}.{} IS %s").format(
                    sql.Identifier(TABLE_NAME),
                    sql.Identifier(col)
                ), (comment,))

            # 动态创建索引
            indexes = [
                ("stock_code", "stock_code"),
                ("exchange", "exchange"),
                ("composite", "stock_code, exchange")
            ]
            for idx_type, columns in indexes:
                idx_name = generate_index_name(idx_type)
                cur.execute(sql.SQL("""
                    CREATE INDEX IF NOT EXISTS {} ON {} ({})
                """).format(
                    sql.Identifier(idx_name),
                    sql.Identifier(TABLE_NAME),
                    sql.SQL(columns)
                ))
                
        conn.commit()
        print(f"表 {TABLE_NAME} 初始化完成")
    except Exception as e:
        print(f"表操作异常: {e}")
        conn.rollback()

def clean_stock_data(df):
    """数据清洗优化版（含空值处理）"""
    # 统一交易所代码格式
    exchange_mapping = {'SSE': 'SH', 'SZSE': 'SZ', 'BSE': 'BJ'}
    df['exchange'] = df['exchange'].str.upper().replace(exchange_mapping)
    
    # 过滤无效交易所并保留空值
    valid_exchanges = ['SH', 'SZ', 'BJ']
    return df[df['exchange'].isin(valid_exchanges) | df['exchange'].isna()]

def insert_stock_data(conn, data):
    """批量插入数据（带动态表名）"""
    try:
        with conn.cursor() as cur:
            extras.execute_values(
                cur,
                sql.SQL("""
                    INSERT INTO {} (stock_code, short_name, exchange, list_date)
                    VALUES %s
                    ON CONFLICT (stock_code, exchange) DO UPDATE SET
                        short_name = EXCLUDED.short_name,
                        list_date = EXCLUDED.list_date
                """).format(sql.Identifier(TABLE_NAME)),
                data,
                page_size=500,
                template="(%s, %s, %s, %s)"
            )
        conn.commit()
        print(f"成功插入/更新 {len(data)} 条数据")
    except Exception as e:
        print(f"数据操作失败: {e}")
        conn.rollback()

def main():
    # 正式环境使用（保留注释）
    # 获取所有股票代码
    raw_df = adata.stock.info.all_code()
    
    # 测试数据（正式环境需注释）
    # raw_df = pd.DataFrame({
    #     'stock_code': ['600000', '000001'],
    #     'short_name': ['浦发银行', '平安银行'],
    #     'exchange': ['SH', 'SZ'],
    #     'list_date': ['1999-11-10', None]  # 包含空值测试
    # })
    
    conn = connect_to_db()
    if not conn:
        return

    try:
        create_stock_info_table(conn)
        
        if raw_df.empty:
            print("无输入数据")
            return

        # 数据清洗和转换
        clean_df = clean_stock_data(raw_df)
        data = [
            (
                row['stock_code'],
                row['short_name'],
                row['exchange'],
                row['list_date'] if pd.notna(row['list_date']) else None
            )
            for _, row in clean_df.iterrows()
        ]

        if data:
            insert_stock_data(conn, data)
        else:
            print("清洗后无有效数据")
            
    except Exception as e:
        print(f"主流程异常: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    main()