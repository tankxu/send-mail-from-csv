# 海报生成器 & 发送邮件
本脚本的目的是为了方便人事部为公司新人发送欢迎邮件。脚本运行时会根据表格中提供的数据自动生成欢迎海报，并自动发送至指定的邮箱。

本脚本使用 nodejs，主要依赖有 csv-parser（读取表格）、gm（生成海报）、nodemailer（发送邮件）。


## 使用步骤
以下步骤所使用的操作系统为 macOS。

1. 下载整个文件夹
2. 打开系统中的终端（Terminal）应用程序，在终端中输入以下命令，安装系统所需的程序。（电脑没有安装过 homebrew 的话请先自行安装）
    ```
    brew install imagemagick
    brew install graphicsmagick
    ``` 
3. 在终端中进入到脚本所在文件夹 ```cd xxxxx/xxxx/send-mail-from-csv``` (输入 cd 后将脚本文件夹拖入终端)
4. 在终端中输入 ```npm i``` 安装脚本所需依赖。（电脑没有 nodejs 和 npm 的话请先自行安装）
5. 用 Number、Excel、或者文本编辑修改脚本文件夹中 data.csv 中的数据。
6. 用文本编辑器修改 mail.js 中第 7、8 行的邮箱账号信息（填写用于发送邮件的腾讯企业邮箱地址和密码）。
7. 以上准备工作完成后可以开始运行脚本，在终端中输入 ```node script.js``` 即可开始自动生成海报并发送邮件，生成的海报会保存在 images 文件夹中，脚本运行的日志会在终端中显示，脚本运行时间受电脑性能与网速影响。

脚本运行日志：
![image](https://user-images.githubusercontent.com/5106039/95648298-bb014a80-0b08-11eb-80e7-8f5af2874067.png)
