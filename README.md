This is a wordpress plugin.

The purpose of this plugin is to add some features in Wordpress that will be useful to create website for outdoor sports companies like (rafting, canyoning, rock climbing, mountain bike, skiing, hiking, ...).
This plugin will help to create a website that is optimized for outdoor activities and will provide a better user experience.
It will add some custom post types, taxonomies, meta fields and Gutenberg blocks to help create a website that is easy to update and customize.
It will also add some utility classes to help create responsive and flexible layouts.

## Start development :

To start the development of the plugin follow these commands :

```
npm install
npm start
npm run sass-watch
```

Edit the files in the src folder


## Build

Build the plugin :
```
npm run build
```


## Features

This plugin adds the following features to WordPress:

#### Custom Post Types

- `activities`: Custom post type for representing outdoor activities like hiking, climbing, kayaking, etc.
- `guides`: Custom post type for representing guides for outdoor activities.

#### Custom Taxonomies

- `sport`: Custom taxonomy for categorizing activities by sport (e.g., "hiking", "kayaking", etc.).
- `difficulty`: Custom taxonomy for categorizing activities by difficulty level (e.g., "easy", "medium", "hard").
- `duration`: Custom taxonomy for categorizing activities by duration (e.g., "1-hour", "2-hours", etc.).
- `activity-type`: Custom taxonomy for categorizing activities by type (e.g., "walking", "kayaking", etc.).

#### Custom Taxonomy for Guides

- `sport`: Custom taxonomy for categorizing guides by sport.

#### Meta Fields

- `meeting-point`: Meta field for storing the location where an activity takes place.
- `infos`: Meta field for storing additional information about an activity.
- `price`: Meta field for storing the price of an activity.
- `downloads`: Meta field for storing links to downloadable resources related to an activity.

### Gutenberg Blocks

A set of Gutenberg blocks are included to help create content in a more intuitive way.

#### Leafletmap Block

This block allows you to add a Leaflet map to your page or post.

#### Container Block

This block allows you to create a container with a set of options, like:

* Choose the tag to be used (div, section, article, aside, etc.)
* Set the display (flex, block, grid or none)
* Set the number of columns
* Set responsive behavior for the columns

#### Featured Image Block

This block allows you to add a featured image to your page or post, loading it lazily.

#### Images Block

This block allows you to add multiple images to your page or post, displaying them as a grid or a slideshow, with thumbnails, lightbox and responsive behavior.

#### Meta Files Block

This block allows you to add a list of downloadable files to your page or post.

#### Meta Lists Block

This block allows you to add a list of items to your page or post, with a title and description for each item.

#### Meta Price Table Block

This block allows you to add a table of prices to your page or post.

#### Query Loop Block

This block allows you to create a custom loop of posts based on a custom query, with the option of related posts of the current post.

#### Taxonomy Image Block

This block allows you to add the cover image of a specified taxonomy term to your page or post.

#### Terms List Block

This block allows you to add a list of terms of a specified custom taxonomy to your page or post.

#### Reservation Card Block

This block allows you to add a reservation card to your page or post, with the option to display either a phone number or a booking modal.

#### Contact Form Block

This block allows you to add a contact form to your page or post, with a pre-configured form with some fields.


# Utility Classes

This plugin provides a set of utility classes for building responsive and flexible layouts using CSS. Below is a summary of the available utility classes and their usage.

## Grid Layout

### Grid Container

- `.grid`: Defines a grid container.

### Columns Layout

- `.columns-{number-of-columns}`: Defines grid columns with a specified number of columns.
- `.columns-{max-screen-size}-{number-of-columns}`: Defines grid columns with a specified number of columns for a maximum screen size.
- `.columns-{max-screen-size}-{number-of-columns}-{spacing-x}-{spacing-y}`: Defines grid columns with a specified number of columns and spacing for a maximum screen size.

## Alignment Classes

### Justify Content

- `.justify-start`: Aligns items to the start of the container.
- `.justify-end`: Aligns items to the end of the container.
- `.justify-ctr`: Aligns items to the center of the container.
- `.justify-sp-btn`: Distributes items evenly with space between them.

### Align Items

- `.align-start`: Aligns items to the start of the container.
- `.align-end`: Aligns items to the end of the container.
- `.align-ctr`: Aligns items to the center of the container.

### Flexbox

- `.flx`: Displays container as a flexbox.
- `.flx-ctr`: Centers items both horizontally and vertically within the container.
- `.flx-col`: Sets flex direction to column.
- `.flx-wrap`: Allows flex items to wrap onto multiple lines if needed.

## Other Layout Utilities

- `.hide-text`: Hides text from being visible on the screen.
- `.w100`: Sets width to 100%.
- `.h100`: Sets height to 100%.
- `.txt-ctr`: Centers text within its container.
- `.f-up`: Transforms text to uppercase.
- `.f-b`: Sets font weight to 700 (bold).
- `.f-sb`: Sets font weight to 500 (semi-bold).
- `.no-deco`: Removes text decoration (underline, overline, etc.).
- `.pos-abs`: Sets position to absolute.
- `.pos-rel`: Sets position to relative.

### Z-index

- `.z-{index}`: set the z-index (1 to 6 max).

## Spacing Utilities

### Padding and Margin

- `.p-{spacing}`: Applies padding of specified size.
- `.px-{spacing}`: Applies horizontal padding of specified size.
- `.py-{spacing}`: Applies vertical padding of specified size.

- `.pt-{spacing}`: Applies padding to the top of specified size.
- `.pb-{spacing}`: Applies padding to the bottom of specified size.
- `.pl-{spacing}`: Applies padding to the left of specified size.
- `.pr-{spacing}`: Applies padding to the right of specified size.

- `.m-{spacing}`: Applies margin of specified size.
- `.mx-{spacing}`: Applies horizontal margin of specified size.
- `.my-{spacing}`: Applies vertical margin of specified size.

- `.mt-{spacing}`: Applies margin to the top of specified size.
- `.mb-{spacing}`: Applies margin to the bottom of specified size.
- `.ml-{spacing}`: Applies margin to the left of specified size.
- `.mr-{spacing}`: Applies margin to the right of specified size.

- `.gap-{spacing}`: Applies gap of specified size.
- `.gx-{spacing}`: Applies horizontal gap of specified size.
- `.gy-{spacing}`: Applies vertical gap of specified size.

### Responsive Spacing

- `.p-{max-screen-size}-{spacing}`: Responsive padding for a maximum screen size.
- `.px-{max-screen-size}-{spacing}`: Responsive horizontal padding for a maximum screen size.
- `.py-{max-screen-size}-{spacing}`: Responsive vertical padding for a maximum screen size.
- `.m-{max-screen-size}-{spacing}`: Responsive margin for a maximum screen size.
- `.mx-{max-screen-size}-{spacing}`: Responsive horizontal margin for a maximum screen size.
- `.my-{max-screen-size}-{spacing}`: Responsive vertical margin for a maximum screen size.

## Border Radius Utilities

- `.br-{size-slug}`: Applies border radius of specified size.

## Font Sizes and Families

- `.f-{size-slug}`: Sets font size based on predefined slugs.
- `.f-{font-family}`: Sets font family based on predefined families.

## Color Utilities

- `.color-{color}`: Sets text color based on predefined color variables.
- `.bg-color-{color}`: Sets background color based on predefined color variables.

## Flex Column Utilities

- `.col-{number}`: Sets column width within a flex container.
- `.col-{breakpoint}-{number}`: Responsive column width within a flex container based on breakpoints.

## Grid Span Utilities

- `.grid-col-span-{number}`: Spans grid columns across a specified number of columns.
- `.grid-row-span-{number}`: Spans grid rows across a specified number of rows.



