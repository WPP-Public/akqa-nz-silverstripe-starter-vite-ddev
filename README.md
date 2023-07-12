# SilverStripe Starter

A basic Silverstripe website build to use a reference or guide for a better
local development setup.

## Features

-   ddev for local development (https://akqa.atlassian.net/wiki/spaces/TECH/pages/125283794/Local+Development+101)
-   ssl enabled out of the box
-   yarn setup for typescript and react.
-   vite for building assets with live-reload on local.
-   storybook for components.

## How to use

To use this as a starter for your project either copy the relevant files into
your own project, or, if you have a new project you can use this as a starter

Then search and replace any references of `sitename` in the folder to your
project specific one. This will be in the following files at least:

    * package.json/composer.json
    * .ddev/.env
    * .ddev/config.yaml

After updating the project with your references, time to do a system check

Start the docker:

```
ddev start
```

Do a database build

```
ddev exec ./vendor/bin/sake dev/build
```

Setup yarn

```
ddev yarn
```

Check your project works at the ddev site URL and perform an initial commit to
git.

```
git init
git remote add origin <your-project@bitbucket>
git add .
git commit -a -m "initial commit"
```

Now start coding, you fantastic human being.

## Using the frontend

```
ddev yarn dev
```

This will run a local Vite dev server which supports hot reload for components.

The relevant plumbing for the backend server is in the
`app/templates/Includes/Requirements.ss` file.

## Default CMS login

Username: **admin**
Password: **admin**

## React components within Silverstripe

In order to leverage the latest technologies you can build your front ends using
React components. A `Banner` component has been setup as a demonstration but the
steps to use them are like below.

1. Write your JSX component in `app/client/src/components/` with props etc
2. Register your component in `app/client/src/state/Registry`.
3. Pass your data from the Silverstripe template to React `<div data-component="ComponentName"></div>`

Props can be passed to the ComponentName by using `data-props='{}'` which takes
a JSON string of the state. Because writing JSON in templates is annoying, I
recommend generating the JSON in PHP.

```
public function getBannerProps(): string
{
    return json_encode([
        'title' => (string) $this->Title,
    ]);
}
```

I also highly recommend utilizing the partial caching within Silverstripe to
make the component highly efficient (https://docs.silverstripe.org/en/5/developer_guides/performance/partial_caching/)

```
<% cached 'banner', $ID, $LastEdited %>
<div data-component="Banner" data-props="{$BannerProps}"></div>
<% end_cached %>
```
