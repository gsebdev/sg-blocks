This is a wordpress plugin still in development...

Features :
- Adds 2 custom post types : 'activites' and 'guides'
- Adds 4 custom taxonomies to activties : 'sport', 'difficulty', 'duration', 'activtiy-type',
- Adds 1 custom taxonomy to guides : 'sport',
- Adds support for meta fields (meeting-point, infos, price, downloads, ...)
- Adds a bunch of Gutenberg blocks

### Start development :

To start the development of the plugin follow these commands :

```
npm install
npm start
npm run sass-watch
```

Edit the files in the src folder


### Build

Build the plugin :
```
npm run build
```

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



