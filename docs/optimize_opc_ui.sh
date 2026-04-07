#!/bin/bash
# OPC搭子 UI/UX 优化脚本
# 自动替换 emoji 为 SVG 图标

set -e

FRONTEND_DIR=~/Projects/opcdazi/frontend
VIEWS_DIR=$FRONTEND_DIR/src/views

echo "🎨 开始优化 OPC搭子 UI/UX..."

# 统计信息
TOTAL_FILES=0
OPTIMIZED_FILES=0

# 检查文件是否需要优化
needs_optimization() {
    local file=$1
    if grep -q "icon: '" "$file" || grep -q "emoji:" "$file" || grep -q "aria-label=\"\"" "$file" 2>/dev/null; then
        return 0
    fi
    return 1
}

# 优化单个文件（标记需要手动处理）
optimize_file() {
    local file=$1
    local filename=$(basename "$file")
    
    echo "📝 发现需要优化的文件: $filename"
    ((TOTAL_FILES++))
    
    # 这里只是标记，实际优化需要手动处理
    # 因为每个页面的图标映射不同
    
    echo "$filename" >> /tmp/opc_optimize_list.txt
}

# 扫描所有 Vue 文件
echo "🔍 扫描 Vue 文件..."
find "$VIEWS_DIR" -name "*.vue" -type f | while read -r file; do
    if needs_optimization "$file"; then
        optimize_file "$file"
    fi
done

# 输出统计
echo ""
echo "📊 优化统计："
echo "  总文件数：$TOTAL_FILES"
echo "  需要优化的文件列表：/tmp/opc_optimize_list.txt"
echo ""
echo "✅ 扫描完成！"
echo ""
echo "下一步："
echo "1. 查看需要优化的文件列表：cat /tmp/opc_optimize_list.txt"
echo "2. 逐个文件手动优化（每个文件的图标映射不同）"
echo "3. 优先处理核心页面：Chat.vue, BuddyIndex.vue, Profile.vue"
