import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        images: [
            {
                public_id: {
                    type: String,
                    required: [true, "Please provide the public ID for the image"],
                },
                url: {
                    type: String,
                    required: [true, "Please provide the URL for the image"],
                },
            },
        ],
        categories: [String],
        tags: [String],
        author: { type: String, default: 'WellWood Team' },
        published: { type: Boolean, default: false },
        publishedAt: { type: Date },
        readingTime: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        versionKey:false
    }
);

// Native slug generation
blogSchema.pre('validate', function (next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-');
    }
    next();
});

// Reading time estimate
blogSchema.pre('save', function (next) {
    if (this.isModified('content')) {
        const words = this.content.split(/\s+/).length;
        this.readingTime = Math.ceil(words / 200);
    }
    next();
});

const BlogModel = mongoose.models.blogs || mongoose.model('blogs', blogSchema);
export default BlogModel;