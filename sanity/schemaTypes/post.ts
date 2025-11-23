import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Bài Viết', 
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (rule) => rule.required().error('Nhập cái tiêu đề vào thằng ngu!'),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'title', 
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
    defineField({
      name: 'body',
      title: 'Nội dung chính',
      type: 'array',
      of: [
        { type: 'block' }, 
        {
          type: 'image', 
          options: { hotspot: true },
        },
      ],
    }),
  ],
})