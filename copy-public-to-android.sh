# copy-public-to-android.sh
#!/bin/bash

PUBLIC_DIR=public
ASSETS_DIR=android/app/src/main/assets

# 清空旧资源
rm -rf $ASSETS_DIR

# 创建 assets 文件夹
mkdir -p $ASSETS_DIR

# 复制 public 文件夹内容
cp -r $PUBLIC_DIR/* $ASSETS_DIR/