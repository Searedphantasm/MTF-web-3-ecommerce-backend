import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitData1740827355965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO category (id, name, slug, description, image, image_key, created_at, updated_at)
    VALUES (
      2,
      'ویژه',
      'ویژه',
      'محصولات ویژه',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f', -- تصویر محصولات مراقبت از پوست
      'cat-key-random-001',
      '2025-02-13 21:09:42.560415',
      '2025-02-13 21:09:42.560415'
    );

        INSERT INTO category (id, name, slug, description, image, image_key, created_at, updated_at)
        VALUES (
                   3,
                   'آرایشی',
                   'آرایشی',
                   'محصولات آرایشی با کیفیت بالا',
                   'https://images.unsplash.com/photo-1596462502278-27bfdc403348', -- تصویر محصولات آرایشی
                   'cat-key-random-004',
                   '2025-03-01 14:25:17.123456',
                   '2025-03-01 14:25:17.123456'
               );

        INSERT INTO category (id, name, slug, description, image, image_key, created_at, updated_at)
        VALUES (
                   4,
                   'مراقبت پوست',
                   'مراقبت-پوست',
                   'محصولات مراقبت از پوست صورت و بدن',
                   'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6', -- تصویر کرم مراقبت پوست
                   'cat-key-random-005',
                   '2025-03-05 09:15:33.789012',
                   '2025-03-05 09:15:33.789012'
               );

        INSERT INTO sub_category (id, name, slug, description, image, image_key, created_at, updated_at, parent_category_id)
        VALUES (
                   3,
                   'لوازم آرایش صورت',
                   'face-makeup',
                   'محصولات آرایش صورت شامل کرم پودر و رژگونه',
                   'https://images.unsplash.com/photo-1522335786673-5f2b6789b00d', -- تصویر آرایش صورت
                   'subcat-key-random-006',
                   '2025-03-01 14:30:22.456789',
                   '2025-03-01 14:30:22.456789',
                   3
               );

        INSERT INTO brand (id, name, slug, description, logo, logo_key, country, website_url, created_at, updated_at)
        VALUES (
                   2,
                   'نایک',
                   'نایک',
                   'برند معروف محصولات ورزشی و زیبایی',
                   'https://images.unsplash.com/photo-1542291026-7eec264c27ff', -- تصویر لوگوی خیالی
                   'brand-key-random-008',
                   'آمریکا',
                   'https://nike.com',
                   '2025-03-02 10:45:12.345678',
                   '2025-03-02 10:45:12.345678'
               );

        INSERT INTO brand (id, name, slug, description, logo, logo_key, country, website_url, created_at, updated_at)
        VALUES (
                   3,
                   'لورآل',
                   'لورآل',
                   'برند فرانسوی محصولات آرایشی و بهداشتی',
                   'https://images.unsplash.com/photo-1523987355523-429a6b86e41a', -- تصویر لوگوی خیالی
                   'brand-key-random-009',
                   'فرانسه',
                   'https://loreal.com',
                   '2025-03-06 16:10:29.654321',
                   '2025-03-06 16:10:29.654321'
               );

        INSERT INTO sub_category (id, name, slug, description, image, image_key, created_at, updated_at, parent_category_id)
        VALUES (
                   4,
                   'مرطوب کننده‌ها',
                   'moisturizers',
                   'انواع کرم‌ها و لوسیون‌های مرطوب کننده',
                   'https://images.unsplash.com/photo-1570194068966-547ca0d4c6d7', -- تصویر مرطوب کننده
                   'subcat-key-random-007',
                   '2025-03-05 09:20:45.987654',
                   '2025-03-05 09:20:45.987654',
                   4
               );

    -- درج زیرمجموعه
    INSERT INTO sub_category (id, name, slug, description, image, image_key, created_at, updated_at, parent_category_id)
    VALUES (
      2,
      'محصولات پیشنهادی',
      'featured-products',
      'برنامه هفتگی باید و نباید ها',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796', -- تصویر لوازم آرایشی
      'subcat-key-random-002',
      '2025-02-13 21:10:08.600437',
      '2025-02-13 21:10:08.600437',
      2
    );

    -- درج برند
    INSERT INTO brand (id, name, slug, description, logo, logo_key, country, website_url, created_at, updated_at)
    VALUES (
      1,
      'تست برند',
      'تست-برند',
      'لورم ایپسوم متن ساختگی با تولیدصنعت چاپ و',
      'https://images.unsplash.com/photo-1587013830669-6e2c6146fb53', -- تصویر عطر به عنوان لوگو
      'brand-key-random-003',
      'آمریکا',
      'https://google.com',
      '2025-02-13 21:03:49.652266',
      '2025-02-13 21:03:49.652266'
    );

    -- درج محصول 2
    INSERT INTO product (id, title, slug, rating, poster, poster_key, alt_text, description, price, product_stock, product_discount_price, product_discount_percentage, status, consumer_guide, contact, created_at, updated_at, brand_id)
    VALUES (
      2,
      'تست محصول ویژه',
      'تست-محصول-ویژه',
      0,
      'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07', -- تصویر رژ لب
      'prod2-key-random-004',
      'تصویر محصول - رژ لب',
      'تست تست تست',
      1500,
      8,
      500,
      null,
      'AVAILABLE',
      'این تست محصولات ویژه',
      '09123456789',
      '2025-02-13 21:11:32.213525',
      '2025-02-16 22:56:11.802038',
      1
    );

    -- درج ارتباط زیرمجموعه برای محصول 2
    INSERT INTO product_sub_categories_sub_category ("productId", "subCategoryId")
    VALUES (2, 2);

    -- درج تصاویر برای محصول 2
    INSERT INTO product_image (id, url, url_key, alt_text, created_at, product_id)
    VALUES (
      2,
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796', -- نمای نزدیک لوازم آرایشی
      'img2-key-random-005',
      'نمای نزدیک رژ لب',
      '2025-02-13 21:11:32.213525',
      2
    );
    INSERT INTO product_image (id, url, url_key, alt_text, created_at, product_id)
    VALUES (
      3,
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f', -- جزئیات محصول مراقبت از پوست
      'img3-key-random-006',
      'تصویر محصول - جزئیات رژ لب',
      '2025-02-16 19:10:59.017547',
      2
    );

    -- درج مشخصات برای محصول 2
    INSERT INTO product_specification (id, spec_title, spec_description, product_id)
    VALUES (2, 'مشخصات فنی', 'توضیحات تست', 2);

    -- درج رنگ‌ها برای محصول 2
    INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
    VALUES (8, 'B107', '217,89,149', 3, true, 2);
    INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
    VALUES (9, 'C45', '20,45,64', 5, true, 2);

-- درج محصول 3
        INSERT INTO product (id, title, slug, rating, poster, poster_key, alt_text, description, price, product_stock, product_discount_price, product_discount_percentage, status, consumer_guide, contact, created_at, updated_at, brand_id)
        VALUES (
                   3,
                   'محصول ویژه جدید',
                   'محصول-ویژه-جدید',
                   4,
                   'https://images.unsplash.com/photo-1596755094514-f87e34085b2c', -- تصویر محصول جدید (مثلا عطر)
                   'prod3-key-random-007',
                   'تصویر محصول - عطر جدید',
                   'توضیحات محصول ویژه جدید',
                   2000,
                   15,
                   1200,
                   40,
                   'AVAILABLE',
                   'راهنمای استفاده از محصول ویژه جدید',
                   '09129876543',
                   '2025-03-07 10:30:00.123456',
                   '2025-03-07 10:30:00.123456',
                   1
               );

-- درج ارتباط زیرمجموعه برای محصول 3
        INSERT INTO product_sub_categories_sub_category ("productId", "subCategoryId")
        VALUES (3, 2);

-- درج تصاویر برای محصول 3
        INSERT INTO product_image (id, url, url_key, alt_text, created_at, product_id)
        VALUES (
                   4,
                   'https://images.unsplash.com/photo-1547887537-6158d7527815', -- نمای نزدیک عطر
                   'img4-key-random-008',
                   'نمای نزدیک محصول جدید',
                   '2025-03-07 10:30:00.123456',
                   3
               );

        INSERT INTO product_image (id, url, url_key, alt_text, created_at, product_id)
        VALUES (
                   5,
                   'https://images.unsplash.com/photo-1572635196237-14b3f281503f', -- جزئیات محصول
                   'img5-key-random-009',
                   'جزئیات محصول جدید',
                   '2025-03-07 10:30:00.123456',
                   3
               );

-- درج مشخصات برای محصول 3
        INSERT INTO product_specification (id, spec_title, spec_description, product_id)
        VALUES (
                   3,
                   'مشخصات کامل',
                   'توضیحات فنی محصول جدید',
                   3
               );

-- درج رنگ‌ها برای محصول 3
        INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
        VALUES (
                   10,
                   'D201',
                   '150,75,200',
                   7,
                   true,
                   3
               );

        INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
        VALUES (
                   11,
                   'E89',
                   '45,200,100',
                   8,
                   true,
                   3
               );


        INSERT INTO product (id, title, slug, rating, poster, poster_key, alt_text, description, price, product_stock, product_discount_price, product_discount_percentage, status, consumer_guide, contact, created_at, updated_at, brand_id)
        VALUES (
                   4,
                   'کرم مرطوب کننده صورت',
                   'کرم-مرطوب-کننده-صورت',
                   4.5,
                   'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6', -- تصویر کرم مرطوب کننده
                   'prod4-key-random-010',
                   'تصویر محصول - کرم مرطوب کننده',
                   'کرم مرطوب کننده مناسب برای انواع پوست',
                   2500,
                   15,
                   2000,
                   20,
                   'AVAILABLE',
                   'مناسب برای پوست خشک و حساس',
                   '09129876543',
                   '2025-03-07 10:30:15.654321',
                   '2025-03-08 12:45:22.987654',
                   2
               );

        INSERT INTO product (id, title, slug, rating, poster, poster_key, alt_text, description, price, product_stock, product_discount_price, product_discount_percentage, status, consumer_guide, contact, created_at, updated_at, brand_id)
        VALUES (
                   5,
                   'رژ لب مات',
                   'رژ-لب-مات',
                   3.8,
                   'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07', -- تصویر رژ لب
                   'prod5-key-random-011',
                   'تصویر محصول - رژ لب مات',
                   'رژ لب با ماندگاری بالا و رنگ مات',
                   1800,
                   10,
                   NULL,
                   NULL,
                   'AVAILABLE',
                   'استفاده روزانه توصیه می‌شود',
                   '09127654321',
                   '2025-03-06 15:20:10.123456',
                   '2025-03-07 09:15:30.456789',
                   3
               );

        INSERT INTO product_sub_categories_sub_category ("productId", "subCategoryId")
        VALUES (4, 4); -- Linking product 4 to subcategory 4 (مرطوب کننده‌ها)

        INSERT INTO product_sub_categories_sub_category ("productId", "subCategoryId")
        VALUES (5, 3); -- Linking product 5 to subcategory 3 (لوازم آرایش صورت)

        INSERT INTO product_image (id, url, url_key, alt_text, created_at, product_id)
        VALUES (
                   11,
                   'https://images.unsplash.com/photo-1570194068966-547ca0d4c6d7',
                   'img11-key-random-012',
                   'نمای نزدیک کرم مرطوب کننده',
                   '2025-03-07 10:30:15.654321',
                   4
               );

        INSERT INTO product_image (id, url, url_key, alt_text, created_at, product_id)
        VALUES (
                   12,
                   'https://images.unsplash.com/photo-1522335786673-5f2b6789b00d',
                   'img12-key-random-013',
                   'تصویر محصول - جزئیات رژ لب مات',
                   '2025-03-06 15:20:10.123456',
                   5
               );

        INSERT INTO product_specification (id, spec_title, spec_description, product_id)
        VALUES (
                   11,
                   'ویژگی‌ها',
                   'مناسب برای پوست خشک، بدون پارابن',
                   4
               );

        INSERT INTO product_specification (id, spec_title, spec_description, product_id)
        VALUES (
                   12,
                   'جزئیات محصول',
                   'ماندگاری 12 ساعته، ضد آب',
                   5
               );

        INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
        VALUES (
                   15,
                   'M201',
                   '255,204,153',
                   7,
                   true,
                   4
               );

        INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
        VALUES (
                   16,
                   'R108',
                   '200,50,70',
                   4,
                   true,
                   5
               );

        INSERT INTO product_colors_entity (id, code, rgb_code, stock, status, "productId")
        VALUES (
                   17,
                   'R109',
                   '150,30,50',
                   6,
                   true,
                   5
               );

      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      `);
  }
}
