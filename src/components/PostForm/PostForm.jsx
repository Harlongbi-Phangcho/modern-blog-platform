import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Input, Select, RTE } from "../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        content: post?.content || "",
        title: post?.title || "",
        status: post?.status || "active",
        slug: post?.slug || "",
        
      },
    });

  const submit = async (data) => {
    if (!userData) {
      console.error("User not logged in");
      return;
    }

    try {
      const file = data?.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (post) {
        if (file && post?.featuredimage) {
          await appwriteService.deleteFile(post.featuredimage);
        }

        const updateData = {
          title: data.title,
          content: data.content,
          status: data.status,
          slug: data.slug,
        };

        if (file) {
          updateData.featuredimage = file.$id;
        }

        const dbPost = await appwriteService.updatePost(post.$id, updateData);

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        if (!file) {
          console.error("Image is required");
          return;
        }
        console.log(({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: file.$id,
          userid: userData.id,
        })
)

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredimage: file.$id,
          userid: userData.id,
          username: userData.name,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")   
        .replace(/\s+/g, "-")          
        .replace(/-+/g, "-")          
        .replace(/^-+|-+$/g, "");  
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div className="flex justify-center py-2 px-2 sm:py-10 sm:px-10 bg-gray-100/60 rounded min-h-screen">
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full max-w-5xl bg-white rounded shadow-lg p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Post Details
          </h2>

          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-4"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug"
            placeholder="auto-generated-slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <div className="mb-4">
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Settings
          </h2>

          <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Current Image</p>
              <img
                src={appwriteService.getFileView(post.featuredimage)}
                alt={post.title}
                className="w-full h-40 object-cover rounded-xl border"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-6"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
           
            className="w-full py-2.5 text-white font-medium rounded-lg 
                       hover:opacity-90 transition"
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  </div>
  );
}

export default PostForm;
