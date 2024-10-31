use chrono::Utc;
use docx_rs::*;
use rand::Rng;
use std::fs::File;
use std::path::Path;
use tauri::command; // 导入 Tauri 命令宏

#[command]
pub fn export_excel(content: &str, root_directory: &str) -> Result<String, String> {
    // 生成当前时间字符串
    let now = Utc::now();
    let time_string = now.format("%Y%m%d%H%M").to_string();

    // 生成随机6位大写字母
    let random_string: String = (0..6)
        .map(|_| rand::thread_rng().gen_range(0..26) as u8 + b'A')
        .map(char::from)
        .collect();

    // 创建文件名
    let file_name = format!("{}-{}", time_string, random_string);
    let file_path = Path::new(root_directory).join(format!("{}.docx", file_name));

    // 创建文件
    let file = match File::create(&file_path) {
        Ok(file) => file,
        Err(e) => return Err(format!("无法创建文件: {}", e)),
    };

    // 添加内容到文档
    if let Err(e) = Docx::new()
        .add_paragraph(Paragraph::new().add_run(Run::new().add_text(content)))
        .build()
        .pack(file)
    {
        return Err(format!("无法写入文件: {}", e));
    }

    // 打印文件的位置
    println!("文件已成功导出到: {}", file_path.display());

    Ok(format!("文件已成功导出到: {}", file_path.display()))
}
