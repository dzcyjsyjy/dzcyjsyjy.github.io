#!/bin/bash

# 达州产业技术研究院官方网站 - 自动备份脚本

# 配置
BACKUP_DIR="/backup"
WEBSITE_DIR="/var/www/html"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="dzcyjsyjy_backup_$DATE.tar.gz"
KEEP_DAYS=30

# 创建备份目录
mkdir -p $BACKUP_DIR

echo "开始备份网站..."
echo "备份时间: $(date)"
echo "备份目录: $BACKUP_DIR"
echo ""

# 创建备份
tar -czf $BACKUP_DIR/$BACKUP_FILE \
    -C $(dirname $WEBSITE_DIR) \
    $(basename $WEBSITE_DIR) \
    2>/dev/null

# 检查备份是否成功
if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    BACKUP_SIZE=$(du -h $BACKUP_DIR/$BACKUP_FILE | cut -f1)
    echo "✓ 备份成功！"
    echo "  文件名: $BACKUP_FILE"
    echo "  大小: $BACKUP_SIZE"
    echo "  路径: $BACKUP_DIR/$BACKUP_FILE"
else
    echo "✗ 备份失败！"
    exit 1
fi

echo ""
echo "清理旧备份文件（保留最近 $KEEP_DAYS 天）..."
find $BACKUP_DIR -name "dzcyjsyjy_backup_*.tar.gz" -mtime +$KEEP_DAYS -delete
echo "✓ 清理完成"

echo ""
echo "当前备份文件列表:"
ls -lh $BACKUP_DIR/dzcyjsyjy_backup_*.tar.gz 2>/dev/null | tail -5

echo ""
echo "备份完成！"
