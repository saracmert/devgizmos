#!/bin/bash

# PWA Icon Generator Script
# Bu script SVG dosyasını farklı boyutlarda PNG'ye dönüştürür

SOURCE_SVG="public/img/icon-512x512.svg"
TARGET_DIR="public/img"

# Gerekli boyutlar
SIZES=(72 96 128 144 152 192 384 512)

echo "PWA ikonları oluşturuluyor..."

# ImageMagick kontrolü
if command -v convert &> /dev/null; then
    echo "ImageMagick bulundu, PNG ikonları oluşturuluyor..."
    
    for size in "${SIZES[@]}"; do
        echo "Icon ${size}x${size} oluşturuluyor..."
        convert "$SOURCE_SVG" -resize "${size}x${size}" "$TARGET_DIR/icon-${size}x${size}.png"
    done
    
    echo "Tüm ikonlar başarıyla oluşturuldu!"
else
    echo "ImageMagick bulunamadı. Manuel olarak aşağıdaki boyutlarda ikonlar oluşturun:"
    for size in "${SIZES[@]}"; do
        echo "- ${size}x${size} (icon-${size}x${size}.png)"
    done
    echo ""
    echo "SVG dosyası: $SOURCE_SVG"
    echo "Hedef klasör: $TARGET_DIR"
fi

# Favicon oluştur (ImageMagick varsa)
if command -v convert &> /dev/null; then
    echo "Favicon oluşturuluyor..."
    convert "$SOURCE_SVG" -resize "32x32" "public/favicon.ico"
    echo "Favicon oluşturuldu: public/favicon.ico"
fi

echo "PWA icon script tamamlandı!"