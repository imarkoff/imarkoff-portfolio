import {SocialLink} from "@/lib/models/AboutMe";
import {LinkButton, LinkButtonProps} from "@/components/ui/Button";
import iconMap from "@/components/icons/IconMap";
import socialLinksMetadata from "@/lib/constants/socialLinksMetadata";
import {ComponentType, Fragment, PropsWithChildren} from "react";

export interface SocialLinksProps {
    /**
     * Array of social links to render.
     * Each link should contain a platform and a username.
     */
    socialLinks: SocialLink[];

    /**
     * Description of the button content.
     * If 'platform', the button will display the platform name.
     * If 'username', it will display the username.
     * If false, no description will be displayed.
     *
     * @default 'platform'
     */
    description?: 'platform' | 'username' | false;

    /**
     * Props to pass to the LinkButton component.
     * Can include properties like isIconButton, size, variant, and className.
     */
    buttonProps?: Pick<LinkButtonProps, 'isIconButton' | 'size' | 'variant' | 'className'>;

    /**
     * Optional wrapper component to wrap each social link button.
     * Useful for applying additional styles or layout.
     *
     * @default Fragment
     */
    Wrapper?: ComponentType<PropsWithChildren>;
}

/**
 * Renders a list of social links as buttons.
 * Each button links to the respective social media platform with the username.
 *
 * @example
 * Show GitHub and LinkedIn links with usernames.
 * Buttons will be styled according to the provided buttonProps.
 * ```jsx
 * <SocialLinks
 *    socialLinks={[
 *    { platform: 'github', username: 'user123' },
 *    { platform: 'linkedin', username: 'user123' }
 *    ]}
 *    description="platform"
 *    buttonProps={{ size: 'small', variant: 'primary' }}
 *  />
 *  ```
 */
export default function SocialLinks(
    {
        socialLinks,
        description = 'platform',
        buttonProps = {},
        Wrapper = Fragment
    }: SocialLinksProps
) {
    return (
        <>
            {socialLinks.map((link) => {
                const metadata = socialLinksMetadata[link.platform];
                const Icon = iconMap[metadata.icon];

                return (
                    <Wrapper key={link.platform}>
                        <LinkButton
                            href={metadata.url(link.username)}
                            target={"_blank"}
                            LeftIcon={Icon}
                            title={`${metadata.name} - ${link.username}`}
                            {...buttonProps}
                        >
                            {description === 'platform' && metadata.name}
                            {description === 'username' && link.username}
                        </LinkButton>
                    </Wrapper>
                );
            })}
        </>
    );
}