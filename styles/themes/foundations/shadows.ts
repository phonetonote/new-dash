const shadows = {
  sm: `1px 1px 2px hsl(var(--shadowColor) / 0.7)`,
  md: `1px 2px 2px hsl(var(--shadowColor) / 0.333),
    2px 4px 4px hsl(var(--shadowColor) / 0.333),
    3px 6px 6px hsl(var(--shadowColor) / 0.333)`,
  lg: `1px 2px 2px hsl(var(--shadowColor) / 0.2),
    2px 4px 4px hsl(var(--shadowColor) / 0.2),
    4px 8px 8px hsl(var(--shadowColor) / 0.2),
    8px 16px 16px hsl(var(--shadowColor) / 0.2),
    16px 32px 32px hsl(var(--shadowColor) / 0.2)`,
  outline: "0 0 0 3px var(--outlineColor)",
};

export default shadows;
