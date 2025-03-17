import adata
import pandas as pd
import psycopg2
from psycopg2 import sql, extras
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 数据库连接配置
DB_CONFIG = {
    'dbname': 'ocean_kite',
    'user': 'postgres',
    'password': 'riusky2025',
    'host': 'localhost',
    'port': 5432
}

def connect_to_db():
    """连接数据库"""
    try:
        return psycopg2.connect(**DB_CONFIG)
    except Exception as e:
        print(f"数据库连接失败: {e}")
        return None

def create_stock_info_table(conn):
    """创建股票信息表（保留 NULL 值）"""
    table_name = 'ok_finance_stock_info'
    try:
        with conn.cursor() as cur:
            # 建表语句（允许 list_date 为 NULL）
            cur.execute(sql.SQL("""
                CREATE TABLE IF NOT EXISTS {} (
                    stock_code VARCHAR(64) NOT NULL,
                    short_name VARCHAR(64) NOT NULL,
                    exchange VARCHAR(64) NOT NULL,
                    list_date VARCHAR(64),  -- 允许 NULL
                    PRIMARY KEY (stock_code, exchange),
                    CONSTRAINT valid_exchange CHECK (exchange IN ('SH', 'SZ', 'BJ'))
                );
            """).format(sql.Identifier(table_name)))

            # 添加注释
            cur.execute(sql.SQL("COMMENT ON TABLE {} IS '存储股票基本信息';").format(sql.Identifier(table_name)))
            cur.execute(sql.SQL("COMMENT ON COLUMN {}.list_date IS '上市日期（允许空值）';").format(sql.Identifier(table_name)))
            
            # 创建索引
            cur.execute(sql.SQL("CREATE INDEX IF NOT EXISTS idx_stock_code ON {} (stock_code);").format(sql.Identifier(table_name)))
            
        conn.commit()
        print(f"表 {table_name} 就绪")
    except Exception as e:
        print(f"表操作失败: {e}")
        conn.rollback()

def clean_stock_data(df):
    """数据清洗（仅处理交易所字段）"""
    # 统一交易所代码
    df['exchange'] = df['exchange'].str.upper().replace({
        'SSE': 'SH',
        'SZSE': 'SZ',
        'BSE': 'BJ'
    })
    
    # 过滤无效交易所
    return df[df['exchange'].isin(['SH', 'SZ', 'BJ'])]

def insert_stock_data(conn, data):
    """批量插入数据（允许 list_date 为 NULL）"""
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
                """).format(sql.Identifier('ok_finance_stock_info')),
                data,
                page_size=500
            )
        conn.commit()
        print(f"已插入/更新 {len(data)} 条记录")
    except Exception as e:
        print(f"数据插入失败: {e}")
        conn.rollback()

def main():
    conn = connect_to_db()
    if not conn:
        return

    try:
        # 建表
        create_stock_info_table(conn)
        
        # 获取并处理数据
        raw_df = adata.stock.info.all_code()
        clean_df = clean_stock_data(raw_df)
        
        # 转换数据格式（保留空值）
        data = [
            (
                row['stock_code'], 
                row['short_name'], 
                row['exchange'], 
                row['list_date'] if pd.notnull(row['list_date']) else None
            )
            for _, row in clean_df.iterrows()
        ]
        
        # 插入数据
        if data:
            insert_stock_data(conn, data)
        else:
            print("无有效数据可插入")
            
    except Exception as e:
        print(f"处理异常: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    main()