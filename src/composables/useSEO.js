import { useI18n } from 'vue-i18n'
import { routeTranslations, getLocalizedRoute } from '../router/routeTranslations.js'

export function useSEO() {
  const { locale } = useI18n()

  const seoMetadata = {
    en: {
      home: {
        title: 'DevGizmos - Essential Developer Tools Collection',
        description: 'Free online developer tools collection. JSON beautifier, password generator, base64 encoder, and 50+ more essential tools for developers.',
        keywords: 'developer tools, json beautifier, password generator, base64 encoder, online tools, programming utilities'
      },
      'json-beautifier': {
        title: 'JSON Beautifier - Format & Pretty Print JSON Online | DevGizmos',
        description: 'Free online JSON formatter and beautifier. Clean up and format your JSON code instantly. No data leaves your browser.',
        keywords: 'json beautifier, json formatter, json pretty print, format json, json validator'
      },
      'json-minifier': {
        title: 'JSON Minifier - Compress JSON Online | DevGizmos',
        description: 'Free JSON minifier tool. Compress and minify your JSON data online. Remove whitespace and reduce file size.',
        keywords: 'json minifier, json compressor, minify json, compress json, json optimizer'
      },
      'password-generator': {
        title: 'Password Generator - Create Strong Secure Passwords | DevGizmos',
        description: 'Generate strong, secure passwords online. Customizable length and character sets. No passwords stored or sent to servers.',
        keywords: 'password generator, secure password, strong password, random password, password creator'
      },
      'case-converter': {
        title: 'Case Converter - Change Text Case Online | DevGizmos',
        description: 'Convert text case online. Transform to uppercase, lowercase, camelCase, PascalCase, snake_case, kebab-case and more.',
        keywords: 'case converter, text case, uppercase, lowercase, camelcase, snake case, kebab case'
      },
      'base64-encoder': {
        title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online | DevGizmos',
        description: 'Free Base64 encoder and decoder tool. Encode text to Base64 or decode Base64 strings online.',
        keywords: 'base64 encoder, base64 decoder, base64 encode, base64 decode, base64 converter'
      },
      'diff-checker': {
        title: 'Diff Checker - Compare Code & Text Differences | DevGizmos',
        description: 'Compare two pieces of code or text and see the differences side-by-side. Perfect for code reviews and text comparison.',
        keywords: 'diff checker, code comparison, text diff, compare files, code diff, text comparison'
      },
      'string-builder': {
        title: 'C# StringBuilder Generator - Escape Code Generator | DevGizmos',
        description: 'Automatic C# StringBuilder escaper code generation. Convert multiline text to StringBuilder append statements.',
        keywords: 'c# stringbuilder, code generator, escape code, append statement, multiline text'
      },
      'lorem-ipsum-generator': {
        title: 'Lorem Ipsum Generator - Placeholder Text Generator | DevGizmos',
        description: 'Generate Lorem Ipsum placeholder text for your designs and mockups. Customizable word and paragraph count.',
        keywords: 'lorem ipsum generator, placeholder text, dummy text, lipsum, filler text'
      },
      'fake-email-generator': {
        title: 'Fake Email Generator - Temporary Email Addresses | DevGizmos',
        description: 'Generate fake email addresses for testing purposes. Perfect for form testing and development.',
        keywords: 'fake email generator, temporary email, dummy email, test email, email testing'
      },
      'guid-generator': {
        title: 'GUID Generator - Generate Unique Identifiers | DevGizmos',
        description: 'Generate version 4 GUIDs (UUIDs) instantly. Cryptographically secure unique identifiers for your applications.',
        keywords: 'guid generator, uuid generator, unique id, identifier, version 4 guid'
      },
      'md5-generator': {
        title: 'MD5 Hash Generator - Create MD5 Checksums | DevGizmos',
        description: 'Generate MD5 hashes from text input. Useful for checksums, data integrity verification, and hash comparison.',
        keywords: 'md5 hash generator, md5 checksum, hash calculator, data integrity, md5 encryption'
      },
      'sha-generator': {
        title: 'SHA Hash Generator - SHA-512, SHA-384, SHA-256 | DevGizmos',
        description: 'Generate SHA hashes (SHA-512, SHA-384, SHA-512/256, SHA-512/224) from text. Secure hash algorithms for data integrity.',
        keywords: 'sha hash generator, sha-512, sha-384, sha-256, hash calculator, secure hash'
      },
      'checksum-calculator': {
        title: 'Checksum Calculator - CRC32, Adler-32, MD5, SHA | DevGizmos',
        description: 'Calculate checksums for files and text. Supports CRC32, Adler-32, MD5, SHA1, SHA256, SHA512 algorithms.',
        keywords: 'checksum calculator, crc32, adler-32, file integrity, hash verification, checksum generator'
      },
      'html-beautifier': {
        title: 'HTML Beautifier - Format & Pretty Print HTML | DevGizmos',
        description: 'Beautify and format your HTML code with proper indentation. Clean up messy HTML instantly.',
        keywords: 'html beautifier, html formatter, pretty print html, format html, html indentation'
      },
      'html-minifier': {
        title: 'HTML Minifier - Compress HTML Code | DevGizmos',
        description: 'Minify HTML code to reduce file size. Remove whitespace and optimize HTML for production.',
        keywords: 'html minifier, html compressor, minify html, compress html, html optimization'
      },
      'mongodb-json-converter': {
        title: 'MongoDB JSON Converter - Convert MongoDB to JSON | DevGizmos',
        description: 'Convert MongoDB JSON format (ObjectId, ISODate, NumberInt) to standard JSON. Perfect for data migration.',
        keywords: 'mongodb json converter, objectid converter, isodate converter, mongodb to json'
      },
      'sql-beautifier': {
        title: 'SQL Beautifier - Format SQL Queries | DevGizmos',
        description: 'Format and beautify SQL queries with proper indentation. Supports MySQL, PostgreSQL, and SQL Server.',
        keywords: 'sql beautifier, sql formatter, format sql, sql indentation, query formatter'
      },
      'e-invoice-viewer': {
        title: 'E-Invoice UBL Viewer - Display XML Invoices | DevGizmos',
        description: 'Display E-Invoice XML (UBL) files in HTML format with embedded XSLT styling support.',
        keywords: 'e-invoice viewer, ubl viewer, xml invoice, e-fatura viewer, invoice xml'
      },
      'url-encoder': {
        title: 'URL Encoder/Decoder - Encode & Decode URLs | DevGizmos',
        description: 'Encode and decode URL strings. Convert special characters for safe URL transmission.',
        keywords: 'url encoder, url decoder, percent encoding, url encoding, uri encoding'
      },
      'jwt-decoder': {
        title: 'JWT Decoder - Decode JSON Web Tokens | DevGizmos',
        description: 'Decode JWT tokens to view header and payload. No signature verification. All processing is done locally.',
        keywords: 'jwt decoder, json web token, jwt parser, token decoder, jwt viewer'
      },
      'my-ip-address': {
        title: 'What Is My IP Address - Check Your Public IP | DevGizmos',
        description: 'Find your public IP address, location, ISP, and browser information. Get detailed network information.',
        keywords: 'what is my ip, ip address checker, public ip, ip location, network information'
      },
      'cidr-calculator': {
        title: 'CIDR Calculator - Subnet Calculator | DevGizmos',
        description: 'Calculate network details from CIDR notation. Get network address, broadcast address, subnet mask, and host count.',
        keywords: 'cidr calculator, subnet calculator, network calculator, ip calculator, subnet mask'
      },
      'utm-link-generator': {
        title: 'UTM Link Generator - Google Analytics Campaign URLs | DevGizmos',
        description: 'Generate UTM campaign links for Google Analytics tracking. Track your marketing campaigns effectively.',
        keywords: 'utm generator, campaign url, google analytics, utm parameters, marketing tracking'
      },
      'og-card-preview': {
        title: 'Open Graph & X Card Preview - Social Media Meta Tags | DevGizmos',
        description: 'Preview and generate Open Graph and X (Twitter) Card meta tags for social media sharing optimization.',
        keywords: 'open graph preview, twitter card, x card, social media meta tags, og tags'
      },
      'regex-tester': {
        title: 'Regex Tester - Test Regular Expressions | DevGizmos',
        description: 'Test JavaScript regular expressions against target strings. Supports flags, multiline patterns, and named groups.',
        keywords: 'regex tester, regular expression, regexp tester, pattern matcher, regex validator'
      },
      'uuid-validator': {
        title: 'UUID/GUID Validator - Validate UUID Formats | DevGizmos',
        description: 'Validate UUID and GUID formats. Supports all versions (v1, v3, v4, v5) with detailed validation results.',
        keywords: 'uuid validator, guid validator, uuid format checker, unique identifier validator'
      },
      'json-validator': {
        title: 'JSON Validator - Validate JSON Format | DevGizmos',
        description: 'Validate JSON format and view structure information. Get detailed error messages and syntax validation.',
        keywords: 'json validator, json syntax checker, json format validator, json parser'
      },
      'unix-timestamp': {
        title: 'Unix Timestamp Converter - Convert Timestamps to Dates | DevGizmos',
        description: 'Convert between Unix timestamps and human-readable dates. Supports local time and UTC conversion.',
        keywords: 'unix timestamp converter, epoch converter, timestamp to date, date converter'
      },
      'file-size-converter': {
        title: 'File Size Converter - Convert Between Units | DevGizmos',
        description: 'Convert file sizes between different units (Bytes, KB, MB, GB, TB). Binary and decimal system support.',
        keywords: 'file size converter, byte converter, kb mb gb converter, storage converter'
      },
      'roman-numeral-converter': {
        title: 'Roman Numeral Converter - Numbers to Roman Numerals | DevGizmos',
        description: 'Convert between decimal numbers and Roman numerals (1-3999 range). Perfect for historical dates and numbering.',
        keywords: 'roman numeral converter, roman numbers, decimal to roman, numeral converter'
      },
      'url-parser': {
        title: 'URL Parser - Parse and Analyze URLs | DevGizmos',
        description: 'Parse URLs to view protocol, host, path, query parameters, and more. Detailed URL component analysis.',
        keywords: 'url parser, url analyzer, parse url, url components, query string parser'
      },
      'slug-generator': {
        title: 'Slug Generator - Create SEO-Friendly URLs | DevGizmos',
        description: 'Generate SEO and URL-friendly slugs from text. Automatic conversion of special characters and multilingual support.',
        keywords: 'slug generator, url slug, seo friendly url, permalink generator, url converter'
      },
      'text-deduplicator': {
        title: 'Text Deduplicator - Remove Duplicate Lines | DevGizmos',
        description: 'Remove duplicate lines or words from text. Choose deduplication mode, case sensitivity, and output format.',
        keywords: 'text deduplicator, remove duplicates, unique lines, duplicate remover, text cleaner'
      },
      'text-sorter-reverser': {
        title: 'Text Sorter & Reverser - Sort and Reverse Text Lines | DevGizmos',
        description: 'Sort, reverse, deduplicate, and clean up text lines with flexible options. Multiple sorting modes available.',
        keywords: 'text sorter, line sorter, text reverser, sort lines, reverse text, text organizer'
      },
      'ascii-unicode-converter': {
        title: 'ASCII Unicode Converter - Convert Text Encoding | DevGizmos',
        description: 'Convert text between ASCII and Unicode formats. Handle character encoding conversions easily.',
        keywords: 'ascii unicode converter, text encoding, character converter, ascii converter, unicode converter'
      },
      'qr-code-generator': {
        title: 'QR Code Generator - Create Custom QR Codes | DevGizmos',
        description: 'Create customizable QR codes for various content types. Download in SVG/PNG formats with color customization.',
        keywords: 'qr code generator, qr creator, custom qr code, qr code maker, barcode generator'
      },
      'color-palette-generator': {
        title: 'Color Palette Generator - Create Beautiful Color Schemes | DevGizmos',
        description: 'Generate beautiful color palettes using color theory. Check color contrasts and create harmonious designs.',
        keywords: 'color palette generator, color scheme, color harmony, color theory, palette creator'
      },
      'color-contrast-checker': {
        title: 'Color Contrast Checker - WCAG Accessibility Compliance | DevGizmos',
        description: 'Check color contrast ratios according to WCAG standards. Verify accessibility compliance for web design.',
        keywords: 'color contrast checker, wcag compliance, accessibility checker, contrast ratio, web accessibility'
      }
    },
    tr: {
      home: {
        title: 'DevGizmos - Geliştirici Araçları Koleksiyonu',
        description: 'Ücretsiz online geliştirici araçları koleksiyonu. JSON güzelleştirici, şifre üretici, base64 kodlayıcı ve 50+ geliştirici aracı.',
        keywords: 'geliştirici araçları, json güzelleştirici, şifre üretici, base64 kodlayıcı, online araçlar, programlama araçları'
      },
      'json-beautifier': {
        title: 'JSON Güzelleştirici - JSON Formatla ve Düzenle | DevGizmos',
        description: 'Ücretsiz online JSON formatlayıcı ve güzelleştirici. JSON kodlarınızı anında temizleyin ve düzenleyin.',
        keywords: 'json güzelleştirici, json formatlayıcı, json düzenle, json formatla, json doğrulayıcı'
      },
      'json-minifier': {
        title: 'JSON Küçültücü - JSON Sıkıştır | DevGizmos',
        description: 'Ücretsiz JSON küçültme aracı. JSON verilerinizi online sıkıştırın ve küçültün.',
        keywords: 'json küçültücü, json sıkıştırıcı, json küçült, json sıkıştır, json optimize'
      },
      'password-generator': {
        title: 'Şifre Üretici - Güvenli Şifreler Oluştur | DevGizmos',
        description: 'Güçlü, güvenli şifreler online oluşturun. Özelleştirilebilir uzunluk ve karakter setleri.',
        keywords: 'şifre üretici, güvenli şifre, güçlü şifre, rastgele şifre, şifre oluşturucu'
      },
      'case-converter': {
        title: 'Harf Dönüştürücü - Metin Harf Durumu Değiştir | DevGizmos',
        description: 'Metin harf durumunu online dönüştürün. Büyük harf, küçük harf, camelCase, PascalCase ve daha fazlası.',
        keywords: 'harf dönüştürücü, metin durumu, büyük harf, küçük harf, camelcase, snake case, kebab case'
      },
      'base64-encoder': {
        title: 'Base64 Kodlayıcı/Çözücü - Base64 Kodla ve Çöz | DevGizmos',
        description: 'Ücretsiz Base64 kodlayıcı ve çözücü araç. Metni Base64\'e kodlayın veya Base64 dizilerini çözün.',
        keywords: 'base64 kodlayıcı, base64 çözücü, base64 kodla, base64 çöz, base64 dönüştürücü'
      },
      'diff-checker': {
        title: 'Diff Kontrol - Kod Farkı Görüntüle | DevGizmos',
        description: 'İki kod arasındaki farkları görüntülemek için Diff Kontrol aracını kullanabilirsiniz.',
        keywords: 'diff kontrol, kod farkı, metin karşılaştır, kod karşılaştır, fark görüntüle'
      },
      'string-builder': {
        title: 'StringBuilder - Otomatik Kaçış Kodu | DevGizmos',
        description: 'Otomatik StringBuilder kaçış kodu üretimi.',
        keywords: 'stringbuilder, kaçış kodu, string oluşturucu, kod üretici, string escape'
      },
      'lorem-ipsum-generator': {
        title: 'Lorem Ipsum Üretici - Sahte Metin Oluştur | DevGizmos',
        description: 'Lorem Ipsum metinleri oluşturmak için Lorem Ipsum Üretici aracını kullanabilirsiniz.',
        keywords: 'lorem ipsum üretici, sahte metin, demo metin, placeholder metin, lipsum'
      },
      'fake-email-generator': {
        title: 'Sahte E-posta Üretici - Geçici E-posta Adresleri | DevGizmos',
        description: 'Sahte e-posta adresleri oluşturmak için Sahte E-posta Üretici aracını kullanabilirsiniz.',
        keywords: 'sahte e-posta üretici, geçici e-posta, dummy e-posta, fake email, test email'
      },
      'guid-generator': {
        title: 'GUID Üretici - Benzersiz Tanımlayıcı Oluştur | DevGizmos',
        description: 'GUID Üretici aracını kullanarak hızlıca uyumlu sürüm 4 GUID oluşturabilirsiniz.',
        keywords: 'guid üretici, uuid üretici, benzersiz tanımlayıcı, guid oluştur, uuid oluştur'
      },
      'md5-generator': {
        title: 'MD5 Hash Üretici - MD5 Şifreleme | DevGizmos',
        description: 'MD5 Üretici aracını kullanarak hızlıca MD5 Hash oluşturabilirsiniz.',
        keywords: 'md5 üretici, md5 hash, md5 şifreleme, hash üretici, kriptografi'
      },
      'sha-generator': {
        title: 'SHA Hash Üretici - SHA Şifreleme | DevGizmos',
        description: 'SHA Üretici aracını kullanarak hızlıca SHA-512, SHA-384, SHA-512/224, SHA-512/256 Hash oluşturabilirsiniz.',
        keywords: 'sha üretici, sha hash, sha şifreleme, hash üretici, kriptografi'
      },
      'checksum-calculator': {
        title: 'Checksum Hesaplayıcı - Dosya Bütünlüğü Kontrolü | DevGizmos',
        description: 'Checksum Hesaplayıcı aracını kullanarak metin veya dosyadan CRC32, Adler-32, MD5, SHA1, SHA256, SHA512 checksum\'ları hesaplayabilirsiniz.',
        keywords: 'checksum hesaplayıcı, dosya kontrolü, hash kontrol, bütünlük kontrolü, crc32'
      },
      'html-beautifier': {
        title: 'HTML Güzelleştirici - HTML Kodlarını Formatla | DevGizmos',
        description: 'HTML kodlarınızı güzelleştirin.',
        keywords: 'html güzelleştirici, html formatlayıcı, html düzenle, html formatla, html beautifier'
      },
      'html-minifier': {
        title: 'HTML Küçültücü - HTML Kodlarını Sıkıştır | DevGizmos',
        description: 'HTML kodlarınızı küçültün.',
        keywords: 'html küçültücü, html sıkıştırıcı, html minify, html küçült, html optimize'
      },
      'mongodb-json-converter': {
        title: 'MongoDB JSON Dönüştürücü - MongoDB Formatını Çevir | DevGizmos',
        description: 'MongoDB JSON formatını (ObjectId, ISODate, NumberInt, vb.) standart JSON formatına dönüştürün.',
        keywords: 'mongodb json dönüştürücü, mongodb format, objectid dönüştür, json çevirici'
      },
      'sql-beautifier': {
        title: 'SQL Güzelleştirici - SQL Sorgularını Formatla | DevGizmos',
        description: 'Daha iyi okunabilirlik için SQL sorgularınızı formatlayın. MySQL, PostgreSQL ve SQL Server destekler.',
        keywords: 'sql güzelleştirici, sql formatlayıcı, sql düzenle, sql formatla, sql beautifier'
      },
      'e-invoice-viewer': {
        title: 'E-Fatura UBL Görüntüleyici - E-Fatura XML Göster | DevGizmos',
        description: 'E-Fatura XML (UBL) dosyalarını HTML formatında görüntüleyin. Gömülü XSLT stillerini destekler.',
        keywords: 'e-fatura görüntüleyici, ubl viewer, e-fatura xml, fatura görüntüle, xml viewer'
      },
      'url-encoder': {
        title: 'URL Kodlayıcı/Çözücü - URL Kodla ve Çöz | DevGizmos',
        description: 'URL Kodlayıcı/Çözücü aracını kullanarak URL dizelerini kodlayabilir veya çözebilirsiniz.',
        keywords: 'url kodlayıcı, url çözücü, url encode, url decode, url converter'
      },
      'jwt-decoder': {
        title: 'JWT Çözücü - JSON Web Token Çöz | DevGizmos',
        description: 'JWT (JSON Web Token) yapıştırarak başlık ve yükünü çözün. İmza doğrulanmaz. Hiçbir veri sunucuya gönderilmez.',
        keywords: 'jwt çözücü, json web token, jwt decode, token çöz, jwt parser'
      },
      'my-ip-address': {
        title: 'IP Adresim - Genel IP Adresini Öğren | DevGizmos',
        description: 'IP Adresim aracını kullanarak genel IP adresinizi öğrenebilirsiniz.',
        keywords: 'ip adresim, genel ip, public ip, ip öğren, ip adresi'
      },
      'cidr-calculator': {
        title: 'CIDR Hesaplayıcı - Ağ Hesaplaması | DevGizmos',
        description: 'CIDR Hesaplayıcı aracını kullanarak CIDR notasyonundaki IP adresinizi analiz edebilir ve ağ adresi, yayın adresi gibi detayları kolayca hesaplayabilirsiniz.',
        keywords: 'cidr hesaplayıcı, ağ hesaplaması, ip hesaplaması, subnet hesaplayıcı, network calculator'
      },
      'utm-link-generator': {
        title: 'UTM Link Üretici - Google Analytics Kampanya Linkleri | DevGizmos',
        description: 'UTM Link Üretici aracını kullanarak Google Analytics için kampanya linkleri oluşturabilirsiniz.',
        keywords: 'utm link üretici, kampanya linkleri, google analytics, utm kodları, campaign links'
      },
      'og-card-preview': {
        title: 'Open Graph ve X Kartı Önizleme - Meta Etiket Oluştur | DevGizmos',
        description: 'Open Graph ve X Kartı Önizleme aracını kullanarak web sayfalarınız için Open Graph ve X Kartı meta etiketlerini önizleyebilir ve oluşturabilirsiniz.',
        keywords: 'open graph, twitter card, x card, meta etiketler, sosyal medya önizleme'
      },
      'regex-tester': {
        title: 'Regex Test Edici - Düzenli İfade Testi | DevGizmos',
        description: 'JavaScript düzenli ifadesi girin ve hedef dizeye karşı test edin. Flag\'ler ve çok satırlı desenler desteklenir.',
        keywords: 'regex test edici, düzenli ifade, regex tester, regexp, pattern tester'
      },
      'uuid-validator': {
        title: 'UUID/GUID Doğrulayıcı - UUID Formatı Kontrol | DevGizmos',
        description: 'UUID ve GUID formatlarını doğrulayın. Tüm sürümleri destekler (v1, v3, v4, v5).',
        keywords: 'uuid doğrulayıcı, guid doğrulayıcı, uuid kontrol, guid kontrol, uuid validator'
      },
      'json-validator': {
        title: 'JSON Doğrulayıcı - JSON Formatı Kontrol | DevGizmos',
        description: 'JSON formatını doğrulayın ve yapı bilgilerini görüntüleyin.',
        keywords: 'json doğrulayıcı, json kontrol, json validator, json format kontrol, json syntax'
      },
      'unix-timestamp': {
        title: 'Unix Timestamp Dönüştürücü - Tarih Çevirici | DevGizmos',
        description: 'Unix timestamp\'ler ile okunabilir tarihler arasında dönüştürme yapın. Yerel saat ve UTC destekler.',
        keywords: 'unix timestamp, tarih dönüştürücü, timestamp çevirici, unix time, epoch time'
      },
      'file-size-converter': {
        title: 'Dosya Boyutu Dönüştürücü - Boyut Birimi Çevirici | DevGizmos',
        description: 'Farklı birimler arasında dosya boyutlarını dönüştürün (Byte, KB, MB, GB, TB).',
        keywords: 'dosya boyutu dönüştürücü, boyut çevirici, kb mb gb, file size converter'
      },
      'roman-numeral-converter': {
        title: 'Roma Rakamı Dönüştürücü - Rakam Çevirici | DevGizmos',
        description: 'Sayılar ile Roma rakamları arasında dönüştürme yapın (1-3999 aralığı).',
        keywords: 'roma rakamı dönüştürücü, roman numeral, rakam çevirici, roma sayıları'
      },
      'url-parser': {
        title: 'URL Ayrıştırıcı - URL Analiz Et | DevGizmos',
        description: 'URL Ayrıştırıcı aracını kullanarak herhangi bir URL\'yi ayrıştırabilir ve inceleyebilirsiniz. Protokol, host, path, sorgu parametreleri ve daha fazlasını görün.',
        keywords: 'url ayrıştırıcı, url parser, url analiz, url çöz, url breakdown'
      },
      'slug-generator': {
        title: 'Slug Üretici - SEO Dostu URL Oluştur | DevGizmos',
        description: 'Slug Üretici aracını kullanarak metninizi SEO ve URL dostu slug\'a dönüştürebilirsiniz. Türkçe, Almanca, Fransızca ve İspanyolca karakterler otomatik olarak dönüştürülür.',
        keywords: 'slug üretici, seo url, url slug, slug generator, seo friendly url'
      },
      'text-deduplicator': {
        title: 'Metin Tekilleştirici - Tekrar Eden Satırları Kaldır | DevGizmos',
        description: 'Metin Tekilleştirici aracını kullanarak metninizden tekrar eden satırları veya kelimeleri kaldırabilirsiniz.',
        keywords: 'metin tekilleştirici, tekrar kaldır, duplicate remover, tekrar eden satır, unique text'
      },
      'text-sorter-reverser': {
        title: 'Metin Sıralayıcı ve Tersine Çevirici - Satır Düzenleyici | DevGizmos',
        description: 'Metin Sıralayıcı ve Tersine Çevirici aracını kullanarak metin satırlarını sıralayabilir, tersine çevirebilir, tekilleştirebilir veya temizleyebilirsiniz.',
        keywords: 'metin sıralayıcı, text sorter, satır sıralama, metin ters çevir, line sorter'
      },
      'ascii-unicode-converter': {
        title: 'ASCII - Unicode Dönüştürücü - Karakter Çevirici | DevGizmos',
        description: 'ASCII - Unicode Dönüştürücü aracını kullanarak metni ASCII veya Unicode formatına dönüştürebilir ve tersini yapabilirsiniz.',
        keywords: 'ascii unicode dönüştürücü, ascii converter, unicode converter, karakter çevirici'
      },
      'qr-code-generator': {
        title: 'QR Kod Üretici - Özelleştirilebilir QR Kodlar | DevGizmos',
        description: 'Çeşitli içerik türleri için özelleştirilebilir QR kodlar oluşturun ve SVG/PNG formatlarında indirin.',
        keywords: 'qr kod üretici, qr code generator, qr kod oluştur, karekod üretici'
      },
      'color-palette-generator': {
        title: 'Renk Paleti Üretici - Güzel Renkler Oluştur | DevGizmos',
        description: 'Çeşitli renk teorilerini kullanarak güzel renk paletleri oluşturun ve renk kontrastlarını kontrol edin.',
        keywords: 'renk paleti üretici, color palette, renk uyumu, renk şeması, color scheme'
      },
      'color-contrast-checker': {
        title: 'Renk Kontrast Kontrol - WCAG Erişilebilirlik | DevGizmos',
        description: 'WCAG standartlarına göre renk kontrastlarını kontrol edin ve erişilebilirlik uyumluluğunu doğrulayın.',
        keywords: 'renk kontrast kontrol, wcag, erişilebilirlik, color contrast, accessibility'
      }
    },
    zh: {
      home: {
        title: 'DevGizmos - 开发者工具集合',
        description: '免费在线开发者工具集合。JSON美化器、密码生成器、Base64编码器等50多个开发者必备工具。',
        keywords: '开发者工具, json美化器, 密码生成器, base64编码器, 在线工具, 编程工具'
      },
      'json-beautifier': {
        title: 'JSON美化器 - 在线格式化和美化JSON | DevGizmos',
        description: '免费在线JSON格式化和美化器。立即清理和格式化您的JSON代码。',
        keywords: 'json美化器, json格式化, json美化, 格式化json, json验证器'
      }
    },
    es: {
      home: {
        title: 'DevGizmos - Colección de Herramientas para Desarrolladores',
        description: 'Colección gratuita de herramientas online para desarrolladores. Embellecedor JSON, generador de contraseñas, codificador Base64 y 50+ herramientas.',
        keywords: 'herramientas desarrollador, embellecedor json, generador contraseñas, codificador base64, herramientas online, utilidades programación'
      },
      'json-beautifier': {
        title: 'Embellecedor JSON - Formatear y Embellecer JSON Online | DevGizmos',
        description: 'Formateador y embellecedor JSON gratuito online. Limpia y formatea tu código JSON al instante.',
        keywords: 'embellecedor json, formateador json, formatear json, json bonito, validador json'
      }
    },
    fr: {
      home: {
        title: 'DevGizmos - Collection d\'Outils pour Développeurs',
        description: 'Collection gratuite d\'outils en ligne pour développeurs. Embellisseur JSON, générateur de mots de passe, encodeur Base64 et 50+ outils.',
        keywords: 'outils développeur, embellisseur json, générateur mot de passe, encodeur base64, outils en ligne, utilitaires programmation'
      },
      'json-beautifier': {
        title: 'Embellisseur JSON - Formater et Embellir JSON en Ligne | DevGizmos',
        description: 'Formateur et embellisseur JSON gratuit en ligne. Nettoyez et formatez votre code JSON instantanément.',
        keywords: 'embellisseur json, formateur json, formater json, json joli, validateur json'
      }
    },
    ja: {
      home: {
        title: 'DevGizmos - 開発者ツールコレクション',
        description: '無料のオンライン開発者ツールコレクション。JSON美化ツール、パスワード生成器、Base64エンコーダーなど50以上のツール。',
        keywords: '開発者ツール, json美化ツール, パスワード生成器, base64エンコーダー, オンラインツール, プログラミングツール'
      },
      'json-beautifier': {
        title: 'JSON美化ツール - オンラインでJSONを整形・美化 | DevGizmos',
        description: '無料のオンラインJSON整形・美化ツール。JSONコードを瞬時にクリーンアップして整形します。',
        keywords: 'json美化ツール, json整形ツール, jsonフォーマッター, json整形, jsonバリデーター'
      }
    },
    de: {
      home: {
        title: 'DevGizmos - Entwickler-Tools-Sammlung',
        description: 'Kostenlose Online-Entwickler-Tools-Sammlung. JSON-Verschönerer, Passwort-Generator, Base64-Encoder und 50+ Tools.',
        keywords: 'entwickler tools, json verschönerer, passwort generator, base64 encoder, online tools, programmier tools'
      },
      'json-beautifier': {
        title: 'JSON-Verschönerer - JSON Online Formatieren und Verschönern | DevGizmos',
        description: 'Kostenloser Online-JSON-Formatierer und -Verschönerer. Bereinigen und formatieren Sie Ihren JSON-Code sofort.',
        keywords: 'json verschönerer, json formatierer, json formatieren, json schön, json validator'
      }
    },
    ru: {
      home: {
        title: 'DevGizmos - Коллекция Инструментов для Разработчиков',
        description: 'Бесплатная коллекция онлайн-инструментов для разработчиков. JSON-украситель, генератор паролей, Base64-кодировщик и 50+ инструментов.',
        keywords: 'инструменты разработчика, json украситель, генератор паролей, base64 кодировщик, онлайн инструменты, программные утилиты'
      },
      'json-beautifier': {
        title: 'JSON-Украситель - Форматировать и Украсить JSON Онлайн | DevGizmos',
        description: 'Бесплатный онлайн JSON-форматировщик и украситель. Мгновенно очистите и отформатируйте ваш JSON-код.',
        keywords: 'json украситель, json форматировщик, форматировать json, json красиво, json валидатор'
      }
    },
    hi: {
      home: {
        title: 'DevGizmos - डेवलपर टूल्स संग्रह',
        description: 'मुफ्त ऑनलाइन डेवलपर टूल्स संग्रह। JSON सुंदरता बनाने वाला, पासवर्ड जेनरेटर, Base64 एनकोडर और 50+ टूल्स।',
        keywords: 'डेवलपर टूल्स, json सुंदरता, पासवर्ड जेनरेटर, base64 एनकोडर, ऑनलाइन टूल्स, प्रोग्रामिंग उपकरण'
      },
      'json-beautifier': {
        title: 'JSON सुंदरता बनाने वाला - ऑनलाइन JSON फॉर्मेट और सुंदर बनाएं | DevGizmos',
        description: 'मुफ्त ऑनलाइन JSON फॉर्मेटर और सुंदरता बनाने वाला। अपने JSON कोड को तुरंत साफ करें और फॉर्मेट करें।',
        keywords: 'json सुंदरता, json फॉर्मेटर, json फॉर्मेट, json सुंदर, json वैलिडेटर'
      }
    }
  }

  function updateMetaTag(name, content, attribute = 'name') {
    let element = document.querySelector(`meta[${attribute}="${name}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  function addHreflangTags(currentRoute, gizmoKey = null) {
    // Remove existing hreflang tags
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove())
    
    const baseUrl = window.location.origin
    const supportedLocales = ['en', 'tr', 'zh', 'es', 'fr', 'ja', 'de', 'ru', 'hi']
    
    supportedLocales.forEach(lang => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = lang
      
      if (gizmoKey) {
        const localizedRoute = getLocalizedRoute(gizmoKey, lang)
        link.href = `${baseUrl}/${lang}/${localizedRoute}`
      } else {
        link.href = `${baseUrl}/${lang}`
      }
      
      document.head.appendChild(link)
    })
    
    // Add x-default
    const defaultLink = document.createElement('link')
    defaultLink.rel = 'alternate'
    defaultLink.hreflang = 'x-default'
    defaultLink.href = gizmoKey ? `${baseUrl}/en/${getLocalizedRoute(gizmoKey, 'en')}` : `${baseUrl}/en`
    document.head.appendChild(defaultLink)
  }

  function addStructuredData(gizmoKey = null) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    let structuredData
    
    if (gizmoKey) {
      const meta = seoMetadata[locale.value]?.[gizmoKey] || seoMetadata.en[gizmoKey]
      structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": meta?.title || "DevGizmos Tool",
        "description": meta?.description || "Free online developer tool",
        "url": window.location.href,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "provider": {
          "@type": "Organization",
          "name": "DevGizmos",
          "url": "https://devgizmos.com"
        }
      }
    } else {
      const meta = seoMetadata[locale.value]?.home || seoMetadata.en.home
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "DevGizmos",
        "description": meta.description,
        "url": "https://devgizmos.com",
        "provider": {
          "@type": "Organization",
          "name": "DevGizmos",
          "url": "https://devgizmos.com"
        }
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }

  function updateSEO(gizmoKey = null) {
    const currentLocale = locale.value
    let meta
    
    if (gizmoKey) {
      meta = seoMetadata[currentLocale]?.[gizmoKey] || seoMetadata.en[gizmoKey]
    } else {
      meta = seoMetadata[currentLocale]?.home || seoMetadata.en.home
    }

    if (meta) {
      // Update title
      document.title = meta.title
      
      // Update meta tags
      updateMetaTag('description', meta.description)
      updateMetaTag('keywords', meta.keywords)
      updateMetaTag('author', 'DevGizmos')
      updateMetaTag('robots', 'index, follow')
      
      // Open Graph tags
      updateMetaTag('og:title', meta.title, 'property')
      updateMetaTag('og:description', meta.description, 'property')
      updateMetaTag('og:url', window.location.href, 'property')
      updateMetaTag('og:type', 'website', 'property')
      updateMetaTag('og:site_name', 'DevGizmos', 'property')
      
      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image')
      updateMetaTag('twitter:title', meta.title)
      updateMetaTag('twitter:description', meta.description)
      
      // Language and canonical
      updateMetaTag('language', currentLocale)
      
      // Update canonical link (not meta tag)
      let canonicalLink = document.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.href = getCanonicalUrl(gizmoKey)
      
      // Add hreflang tags
      addHreflangTags(window.location.pathname, gizmoKey)
      
      // Add structured data
      addStructuredData(gizmoKey)
    }
  }

  function getCanonicalUrl(gizmoKey = null, targetLocale = null) {
    const baseUrl = window.location.origin
    const lang = targetLocale || locale.value
    
    if (gizmoKey) {
      const localizedRoute = getLocalizedRoute(gizmoKey, lang)
      return `${baseUrl}/${lang}/${localizedRoute}`
    }
    
    return `${baseUrl}/${lang}`
  }

  return {
    updateSEO,
    getCanonicalUrl,
    addHreflangTags,
    addStructuredData
  }
}