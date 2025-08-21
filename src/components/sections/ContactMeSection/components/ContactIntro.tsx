"use client";

import TypographyIcon from "@/components/ui/TypographyIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import Typography from "@/components/ui/Typography";
import LinkButton from "@/components/ui/Button/LinkButton";
import MailIcon from "@/components/icons/MailIcon";
import {useRef} from "react";
import useAnimateIntro from "@/components/sections/ContactMeSection/hooks/useAnimateIntro";

interface ContactIntroProps {
    email?: string;
}

export default function ContactIntro(
    { email }: ContactIntroProps
) {
    const introRef = useRef<HTMLDivElement>(null);
    useAnimateIntro(introRef);

    return (
        <div
            className={"flex flex-col gap-4 md:items-center lg:items-start md:text-center lg:text-left"}
            ref={introRef}
        >
            <div className={"flex gap-2.5 items-center"}>
                <TypographyIcon Icon={ChatIcon} variant={"h1"} />
                <Typography variant={"h1"} component={"h2"}>
                    Want to get in touch?
                </Typography>
            </div>
            <Typography>
                Build a hard-loaded CRM, or just want to say hello? <br/>
                I am always open to discussing. Start by filling the form or writing an email.
            </Typography>
            {email && (
                <div>
                    <LinkButton
                        href={`mailto:${email}`}
                        LeftIcon={MailIcon}
                        className={"w-fit"}
                    >
                        {email}
                    </LinkButton>
                </div>
            )}
        </div>
    );
}