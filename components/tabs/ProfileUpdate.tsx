"use client";
import {UploadCloud} from "lucide-react";
import React, {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {profileSave} from "@/actions/users";

export default function ProfileUpdate({userData}: {userData: any}) {
  const [loading, setLoading] = useState(false);
  const [newData, setnewData] = useState(userData);
  const [avatar, setAvatar] = useState<any>();

  const saveProfile = async () => {
    setLoading(true);
    if (!avatar) {
      const avatarData = null;
      const {error, succsess} = JSON.parse(await profileSave(newData, avatarData));
      if (error) {
        toast({
          title: error,
        });
      } else {
        toast({
          title: succsess,
          variant: "success",
        });
      }
      setLoading(false);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onloadend = async () => {
        const formData = reader.result;
        const {error, succsess} = JSON.parse(await profileSave(newData, formData));
        if (error) {
          toast({
            title: error,
          });
        } else {
          toast({
            title: succsess,
            variant: "success",
          });
        }
        setLoading(false);
      };
    }
  };

  return (
    <>
      <div className="bg-secondary/90 rounded-lg p-5 mb-5 mt-5">
        <h3 className="text-lg font-bold mb-5">Profile Settings</h3>

        <div className="grid grid-cols-5 items-center my-2 ">
          <p className="col-span-1">Avatar</p>
          <div className="relative avatar-wrapper w-[50px] h-[50px] rounded-full cursor-pointer">
            <input
              type="file"
              id="avatar"
              className="opacity-0 absolute z-30 top-0 left-0 w-full h-full cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0 && e.target.files[0].type.includes("image")) {
                  setAvatar(e.target.files[0]);
                } else {
                  return;
                }
              }}
              accept="image/*"
              name="avatar"
            />
            <UploadCloud
              className="avatar-drop absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              size={30}
            />
            {avatar ? (
              <div className="w-full h-full">
                <img
                  className="rounded-full object-cover w-full h-full"
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                />
              </div>
            ) : newData?.avatar ? (
              <div className="w-full h-full">
                <img className="rounded-full object-cover w-full h-full" src={newData?.avatar} alt="avatar" />
              </div>
            ) : (
              <div className="">
                <img
                  className="rounded-full object-cover w-full h-full"
                  src={"/user.png"}
                  alt="avatar"
                  width={50}
                  height={50}
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 items-center my-2">
          <label htmlFor="email" className="col-span-1">
            Email
          </label>
          <input
            disabled
            className="col-span-3 disabled cursor-not-allowed"
            id="email"
            value={newData.email}
            readOnly={true}
          />
        </div>
        <div className="grid grid-cols-5 items-center my-2">
          <label htmlFor="name" className="col-span-1">
            Name
          </label>
          <input
            className="col-span-3"
            id="name"
            value={newData.name}
            readOnly={false}
            onChange={(e) => {
              setnewData((prev: any) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div className="grid grid-cols-5 items-center my-2">
          <label htmlFor="phone" className="col-span-1">
            Phone
          </label>
          <input
            className="col-span-3"
            id="phone"
            value={newData.phone}
            readOnly={false}
            onChange={(e) => {
              setnewData((prev: any) => ({
                ...prev,
                phone: e.target.value,
              }));
            }}
          />
        </div>
        <div className="grid grid-cols-5 items-center my-2">
          <label htmlFor="username" className="col-span-1">
            Username
          </label>
          <input
            className="col-span-3"
            id="username"
            value={newData.username}
            readOnly={false}
            onChange={(e) => {
              setnewData((prev: any) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => {
              setnewData(userData);
              setAvatar(null);
            }}
            className="cancel-btn"
          >
            cancel
          </button>
          <button className={`save-btn ${loading ? "loading" : ""}`} onClick={saveProfile}>
            Save
            <span></span>
          </button>
        </div>
      </div>
    </>
  );
}
