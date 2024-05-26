"use client";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

export default function Note({
  orderNoteValue,
  setOrderNoteValue,
  applyNote,
  toggleNote,
  openNote,
  NoteApplied,
  setNoteApplied,
  orderNoteFromCookie,
  setMsg,
  msg,
}: any) {
  const t = useTranslations("common");
  const [textAreaCount, changeTextAreaCount] = useState(0);
  const [savedNote, setIsSavedNote] = useState(false);
  const textareaRef = useRef(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    const savedNote = Cookies.get("order_note");
    if (savedNote) {
      setValue("order_note", savedNote);
      setIsSavedNote(true);
      changeTextAreaCount(savedNote.length);
    }else{
      setIsSavedNote(false);
    }
  }, [setValue]);
  const onSubmit = (data: any) => {
    Cookies.set("order_note", data.order_note);
    setNoteApplied(true);
    // toggleNote();
    setMsg("note_added");
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const toggleSavedNote = () => {
    setIsSavedNote(!savedNote);
  };
  const recalculate = (e: any) => {
    const count = e.target.value.length;
    changeTextAreaCount(count);
  };
  const deleteNote = () => {
    Cookies.remove("order_note");
    setOrderNoteValue("");
    setValue("order_note", "");
    setNoteApplied(false);
    changeTextAreaCount(0);
  };
  const editNote = () => {
    // @ts-ignore
    textareaRef.current.focus();
    if (isDirty) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="">
      <div
        className="flex cursor-pointer items-center justify-between px-4 md:px-8 md:py-6"
        onClick={toggleNote}
      >
        <p className="text-base font-bold md:text-xl">
          {t("add_note_on_order")}
        </p>
        <button className="flex h-11 w-11 items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${openNote ? "" : "rotate-180"}`}
          >
            <path
              d="M14.8995 19.4014C14.8092 19.4961 14.7006 19.5715 14.5802 19.6231C14.4599 19.6746 14.3304 19.7012 14.1995 19.7012C14.0686 19.7012 13.9391 19.6746 13.8188 19.6231C13.6984 19.5715 13.5898 19.4961 13.4995 19.4014L3.5 9.4019L4.9 8.0019L14.1995 17.3014L23.5002 8.0019L24.9002 9.4019L14.8995 19.4014Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div
        className={`flex w-full p-4 md:p-10 border-t border-[#C6C6C6] coupon flex-col ${
          openNote ? "hidden" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${savedNote ? "hidden" : ""}`}
        >
          <p className="pb-1 text-base font-semibold text-gray-50">
            {t("add_note")}
          </p>
          <Controller
            name="order_note"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <div className="relative mb-2">
                <textarea
                  {...field}
                  ref={textareaRef}
                  cols={30}
                  rows={10}
                  id="order_note"
                  className="h-[119px] w-full resize-none rounded-lg border-2 border-gray-300 p-4 focus:outline-none"
                  onChange={(e) => {
                    field.onChange(e);
                    recalculate(e);
                  }}
                  maxLength={150}
                />
                <p className="absolute bottom-4 text-sm leading-none text-gray-50 ltr:right-3 rtl:left-3">
                  {textAreaCount}/150
                </p>
                {field.value && (
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange("");
                      changeTextAreaCount(0);
                    }}
                    className="absolute top-4 rounded-full bg-gray-200 p-[2px] text-white hover:bg-primary-300 ltr:right-4 rtl:left-4"
                  >
                    <XMarkIcon
                      className="h-3 w-3 font-bold"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
            )}
          />

          {NoteApplied && (
            <div className="flex w-full justify-between gap-x-3">
              <button
                type="button"
                className="w-full rounded-lg bg-primary-300 text-sm text-white hover:bg-primary-400"
                onClick={() => {
                  editNote();
                }}
              >
                {t("edit_note")}
              </button>
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-4 text-sm text-primary-300 hover:bg-primary-300 hover:text-white md:px-6"
                onClick={deleteNote}
              >
                {t("delete_note")}
                <TrashIcon className="h-4 w-4 text-primary-300 group-hover:text-white" />
              </button>
            </div>
          )}
          <button
            type="submit"
            className={`${
              NoteApplied ? "hidden" : ""
            }  bg-primary-300 text-white hover:bg-primary-400 rounded-lg focus:ring-4 focus:outline-none text-xl font-semibold w-full sm:w-auto px-12 py-3 text-center `}
            name="add_note"
            defaultValue="Add"
          >
            {t("add")}
          </button>
        </form>
        {savedNote &&(
          <div className="flex flex-col gap-2">
            <h6 className="text-base text-gray-50">{t('order_note')}</h6>
            <p className="max-w-[270px] text-base">{orderNoteValue}</p>
            <button className="inline-block w-fit text-xs font-semibold text-primary-200 underline" onClick={toggleSavedNote}>{t('order_edit')}</button>
            <button className="mt-4 w-fit rounded-lg bg-gray-100 px-12 text-xl leading-[48px] text-primary-202 transition-all hover:bg-gray-900 hover:text-white" onClick={toggleNote}>{t('cancel')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
