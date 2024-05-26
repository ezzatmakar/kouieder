export const runtime = 'edge';

import React from 'react'
import Single from '../../components/product/Single';
import { getBlogBySlug } from '@/app/api/corporateAPI';
import SingleBlog from '../../components/corporate/SingleBlog';

export default async function Blog({
    params,
}: {
    params: { blogSlug: string; };
}) {
    const blogSlug = params.blogSlug
    const blog = await getBlogBySlug(blogSlug);
    
    return (
        <div className="single-recipe">
            <SingleBlog blogData={blog}/>
        </div>
    )
}
