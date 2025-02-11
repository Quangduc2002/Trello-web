# Trello Web

## Getting Started

First, run the development server:

```bash
# Install package
pnpm install

# Run development server
pnpm run dev

# Run production server
pnpm run build
pnpm start
```

More: Install extenstion to preview icon: [Icon-Preivew](https://marketplace.visualstudio.com/items?itemName=hunghg255.iconify-preview)

## Gen Color

1. Update color to `styles/color-preview.json`

- Add value
  Example:

```js
{
   Light: {
     primary: {
       "8": '#FF0000',
     }
   }
}
```

## Gen Font

```js
1. Copy file svg to `public/svgIcon`
2. Run command: `pnpm run gen-font`
3. Check component `Icon` in `src/components/UI/IconFont/Icon.tsx`
```

More: Install extenstion to preview icon: [Icon-Preivew](https://marketplace.visualstudio.com/items?itemName=hunghg255.iconify-preview)

## Library Docs

```md
1. React Vite: https://vite.dev/guide/

2. State management Reactjs: https://jotai.org/

3. Library UI:

- https://ant.design/
- https://tailwindcss.com/

4. Library for request api: https://www.npmjs.com/package/umi-request

5. Library Multiple Language: https://www.npmjs.com/package/next-i18next
```

6. Library Hooks popular: https://ahooks.js.org/

7. Processing CSS: https://sass-lang.com/guide

8. Library dayjs: https://day.js.org/

```

```
