"use client";

import Input from "@/components/ui/FormField/Input";
import TypographyIcon from "@/components/ui/TypographyIcon";
import AccountCircleIcon from "@/components/icons/AccountCircleIcon";
import AlternateEmailIcon from "@/components/icons/AlternateEmailIcon";
import TextArea from "@/components/ui/FormField/TextArea";
import ChatIcon from "@/components/icons/ChatIcon";
import Button from "@/components/ui/Button/Button";
import SendIcon from "@/components/icons/SendIcon";
import Card from "@/components/ui/Card";
import useSendContactRequestApi from "@/components/sections/ContactMeSection/hooks/lib/useSendContactRequestApi";
import useContactRequestForm from "@/components/sections/ContactMeSection/hooks/useContactRequestForm";
import Alert from "@/components/ui/Alert/Alert";
import {useRef} from "react";
import useAnimateForm from "@/components/sections/ContactMeSection/hooks/useAnimateForm";

export default function ContactForm() {
    const cardRef = useRef<HTMLDivElement>(null);
    useAnimateForm(cardRef);

    const {
        isSendingContactRequest,
        contactRequestResponse,
        contactRequestError,
        sendContactRequest
    } = useSendContactRequestApi();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useContactRequestForm(
        sendContactRequest,
        isSendingContactRequest,
        !!contactRequestResponse
    );

    const successMessage = "Your message has been sent successfully! I will get back to you soon.";

    const disabled = isSendingContactRequest || !!contactRequestResponse;

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
        >
            <Card
                className={"flex flex-col gap-2.5 md:w-[450px]"}
                ref={cardRef}
            >
                <Input
                    id={"contact-name"}
                    label={"Your Name"}
                    labelIcon={<TypographyIcon Icon={AccountCircleIcon} />}
                    autoComplete={"name"}
                    placeholder={"John Doe"}
                    disabled={disabled}
                    state={errors.name ? "error" : "default"}
                    message={errors.name?.message}
                    {...register("name", { required: true })}
                />
                <Input
                    id={"contact-email"}
                    label={"Your Email"}
                    labelIcon={<TypographyIcon Icon={AlternateEmailIcon} />}
                    type={"email"}
                    placeholder={"johndoe@example.com"}
                    disabled={disabled}
                    state={errors.email ? "error" : "default"}
                    message={errors.email?.message}
                    {...register("email", { required: true })}
                />
                <TextArea
                    id={"contact-message"}
                    label={"Your Message"}
                    labelIcon={<TypographyIcon Icon={ChatIcon} />}
                    placeholder={"Write your message here..."}
                    maxLength={500}
                    rows={5}
                    disabled={disabled}
                    state={errors.message ? "error" : "default"}
                    message={errors.message?.message}
                    {...register("message", { required: true, maxLength: 500 })}
                />
                <div>
                    <Button
                        type={"submit"}
                        RightIcon={SendIcon}
                        className={"w-full justify-center"}
                        variant={"primary"}
                        disabled={disabled}
                        loading={isSendingContactRequest}
                    >
                        Send Message
                    </Button>
                </div>
                {contactRequestResponse && (
                    <Alert
                        message={successMessage}
                        type={'success'}
                    />
                )}
                {contactRequestError && (
                    <Alert
                        message={contactRequestError.message}
                        type={'error'}
                    />
                )}
                <noscript>
                    <Alert
                        message={"Sending messages requires JavaScript to be enabled. Please enable JavaScript and try again."}
                        type={'warning'}
                    />
                </noscript>
            </Card>
        </form>
    );
}