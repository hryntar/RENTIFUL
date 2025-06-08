"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import { Form } from "./ui/form";
import { CustomFormField } from "./FormField";
import { Button } from "./ui/button";

const SettingsForm = ({ initialData, onSubmit, userType }: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.reset(initialData);
    }
  };

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data);
    setEditMode(false);
  };

  return (
    <div className="pt-8 pb-5 px-8">
      <div className="mb-5">
        <h1 className="text-xl font-semibold">
          {`${userType.charAt(0).toUpperCase() + userType.slice(1)} Settings`}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account preferences and personal information
        </p>
      </div>
      <div className="bg-white rounded-xl p-6">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <CustomFormField name="name" label="Name" disabled={!editMode} />
            <CustomFormField name="email" label="Email" disabled={!editMode} type="email" />
            <CustomFormField name="phoneNumber" label="Phone Number" disabled={!editMode} />
          </form>

          <div className="pt-4 flex justify-between">
            <Button
              type="button"
              className="bg-secondary-500 text-white hover:bg-secondary-600"
              onClick={toggleEditMode}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            {editMode && (
              <Button type="submit" className="bg-primary-700 text-white hover:bg-primary-800">
                Save Changes
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SettingsForm;
