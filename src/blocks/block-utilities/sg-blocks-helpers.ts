type Attributes = {
  layout?: string;
  columns: Record<string, number | null | undefined>;
  gap?: Record<string, number>;
  padding?: Record<string, Record<string, number | { x: number; y: number }>>;
  margin?: Record<string, Record<string, number | { x: number; y: number }>>;
  contentAlignment: string;
};

/**
 * Constructs a CSS class name based on the spacing attributes provided.
 * @param {Record<string, any>} attributes - The spacing attributes object with flexible properties.
 * @returns {string} - The constructed CSS class name.
 */
export const getSpacingClassname = (attributes: {}): string => {
  const properties = ["gap", "padding", "margin"];
  let classNames = "";
  properties.forEach((property) => {
    if (attributes[property]) {
      const shortHand = property.slice(0, 1);
      classNames += Object.entries(attributes[property]).reduce(
        (result, [key, val]) => {
          if (val !== null && val !== undefined) {
            if (typeof val === "number") {
              result += `${shortHand}-${
                key !== "default" ? key + "-" : ""
              }${val} `;
            } else if (typeof val === "object" && ("x" in val || "y" in val)) {
              const x = val["x"]
                ? `${shortHand}x-${key !== "default" ? key + "-" : ""}${
                    val["x"]
                  } `
                : "";
              const y = val["y"]
                ? `${shortHand}y-${key !== "default" ? key + "-" : ""}${
                    val["y"]
                  } `
                : "";
              result += x + y;
            }
          }
          return result;
        },
        ""
      );
    }
  });
  return classNames;
};

/**
 * Generates a classname based on the provided columns object.
 * @param columns - The columns object to generate the classname from.
 * @returns {string} - The generated classname.
 */
export const getColumnsClassname = (
  columns: Record<string, number | null | undefined> | undefined
): string => {
  return columns ? Object.entries(columns)
    .filter(([, val]) => val !== null && val !== undefined && val > 1)
    .map(([key, val]) => `columns-${key !== "default" ? key + "-" : ""}${val}`)
    .join(" ") : "";
};

/**
 * Returns the classname based on the layout type.
 * @param {string} layout - The layout type, either "grid" or "flex" or any other value.
 * @returns {string} - The classname based on the layout type.
 */
export const getLayoutClassname = (layout: string | undefined): string => {
  if (layout === "grid") {
    return "grid ";
  } else if (layout === "flex") {
    return "flx flx-wrap ";
  } else {
    return "";
  }
};

/**
 * Returns the CSS class name for the given alignment.
 * @param {string} alignment - The alignment string (e.g. "top center")
 * @returns {string} - The CSS class name for the alignment
 */
export const getAlignmentClassname = (alignment: string | undefined): string => {
  if (alignment) {
    const [yAlign, xAlign] = alignment.split(" ");

    const alignClasses = {
      x: {
        left: "justify-start",
        right: "justify-end",
        center: "justify-ctr",
      },
      y: {
        top: "align-start",
        bottom: "align-end",
        center: "align-ctr",
      },
    };
    const xClass = alignClasses.x[xAlign] ?? "";
    const yClass = alignClasses.y[yAlign] ?? "";
    return yClass + " " + xClass + " ";
  }
  return "";
};

/**
 * Function to generate class names based on the provided attributes.
 *
 * @param {Attributes} attributes - The attributes object containing layout, columns, spacing, and contentAlignment.
 * @returns {string} - The concatenated class names based on the attributes.
 */
export const getClassNames = (attributes: Attributes): string => {
  return (
    getLayoutClassname(attributes?.layout) +
    getSpacingClassname(attributes) +
    getAlignmentClassname(attributes?.contentAlignment) +
    getColumnsClassname(attributes?.columns)
  );
};

export type ProviderName = "activiteez" | "other";

/**
 * Generate reservation source based on the given value.
 *
 * @param {mixed} $value - The value to be processed
 * @return {mixed} The generated reservation source
 */
export const generateReservationSrc = (
  value: string,
  provider: "activiteez" | "other"
) => {
  if (value === "") {
    return value;
  }
  if (/<iframe.*?src="(.*?)".*?>/i.test(value)) {
    return value.match(/<iframe.*?src="(.*?)".*?>/i)?.[1] ?? "";
  } else if (value.match(/(http|https):\/\/(\S+)/) !== null) {
    return value;
  } else if (/^[\p{L}\s@!']+$/u.test(value) && provider === "activiteez") {
    value = encodeURIComponent(value);
    return (
      "https://activiteez.com/u/23394979244009?&minisitePref=list&search=keyword&noTarget=false&limit=&start=&end=&embedded=true&summary=" +
      value
    );
  } else {
    return null;
  }
};

export const getMinPrice = (
  prices: ([string, string] | { amount: number })[]
) => {
  if (!prices || prices.length === 0) {
    return null;
  }
  if (Array.isArray(prices)) {
    return Math.min(
      ...prices.map((item) => {
        if (Array.isArray(item) && item[1]) {
          return parseInt(item[1]);
        } else if (item["amount"]) {
          return item["amount"];
        } else {
          return undefined;
        }
      })
    );
  }

  return null;
};

// Function to generate the srcset attribute
export interface Sizes {
  [key: string]: {
    height: number;
    width: number;
    url?: string;
    source_url?: string;
    orientation: "landscape" | "portrait" | "square";
  };
}
export const generateSrcset = (sizes: Sizes, excludeSizes?: string[], maxWidth?: number) => {
  const srcsetArray: string[] = [];

  // iterate through keys of sizes
  Object.keys(sizes).forEach((size) => {
    if ((excludeSizes && excludeSizes.includes(size)) || (maxWidth && sizes[size].width > maxWidth)) {
      return;
    }
    const widthDescriptor = sizes[size].width.toString();
    srcsetArray.push(
      `${
        sizes[size].url ? sizes[size].url : sizes[size].source_url
      } ${widthDescriptor}w`
    );
  });

  return srcsetArray.join(", ");
};
export interface SGBlockSizesAttribute {
  [key: string]: number;
}
/**
 * Generate a string representing the image sizes based on the provided breakpoints and viewport widths.
 *
 * @param {SGBlockSizesAttribute} sizes - object containing breakpoint and viewport width pairs
 * @return {string|undefined} string representing the image sizes or undefined if sizes is not an object
 */
export const generateImagesSizes = (
  sizes: SGBlockSizesAttribute
): string | undefined => {
  if (sizes && typeof sizes === "object") {
    let sizesString = "";
    let defaultSize = sizes["default"];
    for (const [breakpoint, vw] of Object.entries(sizes)) {
      if (breakpoint === "default") {
        continue;
      } else {
        if ((defaultSize && defaultSize < (parseInt(breakpoint) * vw) / 100) || !vw) {
          continue;
        } else {
          sizesString += `(max-width:${parseInt(breakpoint)}px) ${vw}vw,`;
        }
      }
    }
    if (defaultSize) sizesString += `(max-width:${defaultSize}px)100vw,${defaultSize}px`;
    return sizesString;
  } else {
    return undefined;
  }
};
