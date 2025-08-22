"use client";

import {useRef} from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/FormField/Input";
import TextArea from "@/components/ui/FormField/TextArea";
import TypographyIcon from "@/components/ui/TypographyIcon";
import Button from "@/components/ui/Button/Button";
import Alert from "@/components/ui/Alert/Alert";
import AccountCircleIcon from "@/components/icons/AccountCircleIcon";
import AlternateEmailIcon from "@/components/icons/AlternateEmailIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import SendIcon from "@/components/icons/SendIcon";
import useSendContactRequestApi from "../hooks/lib/useSendContactRequestApi";
import useContactRequestForm from "../hooks/useContactRequestForm";
import useAnimateForm from "../hooks/useAnimateForm";
import {NOSCRIPT_MESSAGE, SUCCESS_MESSAGE, UNKNOWN_ERROR_MESSAGE} from "../constants";

export default function ContactForm() {
    const cardRef = useRef<HTMLDivElement>(null);
    useAnimateForm(cardRef);

    const {
        isSendingContactRequest,
        isContactRequestResponse,
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
        isContactRequestResponse
    );

    const disabled = isSendingContactRequest || isContactRequestResponse;

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
                {isContactRequestResponse && (
                    <Alert
                        message={SUCCESS_MESSAGE}
                        data-testid={"contact-success-message"}
                        type={'success'}
                    />
                )}
                {contactRequestError && (
                    <Alert
                        message={!!contactRequestError.message ? contactRequestError.message : UNKNOWN_ERROR_MESSAGE}
                        data-testid={"contact-error-message"}
                        type={'error'}
                    />
                )}
                <noscript>
                    <Alert
                        message={NOSCRIPT_MESSAGE}
                        data-testid={"contact-noscript-message"}
                        type={'warning'}
                    />
                </noscript>
            </Card>
        </form>
    );
}