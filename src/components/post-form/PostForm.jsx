import React, { useCallback } from 'react';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/config';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (!userData || !userData.$id) {
                return;
            }
            const slug = data.slug || slugTransform(data.title);
            let file;
    
            if (data.image && data.image[0]) {
                file = await service.uploadFile(data.image[0]);
                if (!file) {
                    console.log("File upload failed");
                    return;
                }
            }
    
            const payload = {
                
                title: data.title,
                content: data.content,
                featuredImage: file ? file.$id : undefined, 
                status: data.status,
                userId: userData.$id,
            };
    
            
            if (!post) {
                const dbPost = await service.createPost(payload); // changes
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const updatedPost = await service.updatePost({
                    ...payload,
                    slug: post.$id,
                });
                if (updatedPost) {
                    navigate(`/post/${updatedPost.$id}`);
                }
            }
        } catch (error) {
            console.log("Error submitting post:", error);
        }
    };  
    
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-yellow"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

// all-posts