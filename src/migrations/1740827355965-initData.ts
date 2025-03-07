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

      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      `);
  }
}
