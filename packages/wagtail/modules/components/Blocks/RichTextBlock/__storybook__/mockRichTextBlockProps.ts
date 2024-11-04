import type { IRichTextBlockProps } from '../types'
import imageFile from './static/image.jpeg'

export const mockRichTextBlockProps: IRichTextBlockProps = {
  id: 'rich-text-block-mock-id',
  value: `
    <p></p>
    <h2><b>Welcome to Our Technology Solutions</b></h2>
    <p>We provide <b>bold</b> and <i>italic</i> text to emphasize important aspects of your
        business.</p>
    <h3><b>Why Choose Us?</b></h3>
    <ul>
        <li>Innovative Solutions</li>
        <li>Expert Team</li>
        <li>Proven Results</li>
    </ul>
    <h4><b>Our Services</b></h4>
    <ol>
        <li>Custom Software Development</li>
        <li>Cloud Integration</li>
        <li>Cybersecurity Solutions</li>
    </ol>
    <p>Need more information? Check out our <a
            href="#contact"
            target="_blank">Contact Us</a> section below.</p>
    <h3><b>Watch Our Video</b></h3>
    <p>Learn more by watching our introduction video:</p>
    <div>
        <iframe width="200" height="113" src="https://www.youtube.com/embed/VDy9e4CDulc?feature=oembed" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""
            title="Start your Business Automation Journey with the Right Partner"></iframe>
    </div>
    <p>Visit our <a href="https://tsl.io/" target="_blank">website</a> for more details.</p>
    <p>Email us at contact@tsl.io or call us at 1 (561) 569-2366.</p>
    <h3><b>Contact Us</b></h3>
    <p>You can also find us on social media or download our brochure below:</p>

    <p>Image left aligned:</p>
    <img alt="0e6d538ae41e5359babfae5a7d1a4beb"
        class="richtext-image left" height="364" src="${imageFile}"
        width="480">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus dapibus ornare.
        Suspendisse ut lobortis enim. Proin maximus rutrum efficitur. Integer mi orci, consequat et est tincidunt,
        porttitor molestie ante. Quisque nulla ipsum, ullamcorper et commodo ac, mollis at dui. Pellentesque et sem nec
        lectus condimentum pellentesque ac sit amet odio. Vestibulum tellus ante, maximus vitae elit nec, condimentum
        sollicitudin orci. Maecenas eu blandit nisi. Duis at tempus enim, id facilisis ipsum.</p>
    <p>Mauris vestibulum congue felis mollis porta. Mauris et arcu blandit, gravida risus a,
        suscipit mi. Morbi sed arcu id quam interdum luctus vitae in nunc. Morbi efficitur neque eu facilisis bibendum.
        Praesent quis mauris quis magna lacinia dignissim eget eget ipsum. Duis blandit magna suscipit pharetra
        porttitor. Nulla suscipit commodo ipsum, sed ullamcorper massa dapibus vel. Donec iaculis tristique libero,
        hendrerit vestibulum tortor consectetur vel. Aenean eu purus justo.</p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>

    <p>Image full width:</p>
    <img alt="0e6d538ae41e5359babfae5a7d1a4beb"
        class="richtext-image full-width" height="364"
        src="${imageFile}" width="480">
    <p></p>

    <p>Image right aligned</p>
    <img alt="0e6d538ae41e5359babfae5a7d1a4beb"
        class="richtext-image right" height="364" src="${imageFile}"
        width="480">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus dapibus ornare.
        Suspendisse ut lobortis enim. Proin maximus rutrum efficitur. Integer mi orci, consequat et est tincidunt,
        porttitor molestie ante. Quisque nulla ipsum, ullamcorper et commodo ac, mollis at dui. Pellentesque et sem nec
        lectus condimentum pellentesque ac sit amet odio. Vestibulum tellus ante, maximus vitae elit nec, condimentum
        sollicitudin orci. Maecenas eu blandit nisi. Duis at tempus enim, id facilisis ipsum.</p>
    <p>Mauris vestibulum congue felis mollis porta. Mauris et arcu blandit, gravida risus a,
        suscipit mi. Morbi sed arcu id quam interdum luctus vitae in nunc. Morbi efficitur neque eu facilisis bibendum.
        Praesent quis mauris quis magna lacinia dignissim eget eget ipsum. Duis blandit magna suscipit pharetra
        porttitor. Nulla suscipit commodo ipsum, sed ullamcorper massa dapibus vel. Donec iaculis tristique libero,
        hendrerit vestibulum tortor consectetur vel. Aenean eu purus justo.</p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>

    <p>Image original size:</p><img alt="0e6d538ae41e5359babfae5a7d1a4beb"
        class="richtext-image original-size" height="364"
        src="${imageFile}" width="480">
    <p></p>

    <p>Image centered:</p>
    <img alt="0e6d538ae41e5359babfae5a7d1a4beb"
        class="richtext-image centered" height="227" src="${imageFile}"
        width="300">
    <p></p>
  `,
}
