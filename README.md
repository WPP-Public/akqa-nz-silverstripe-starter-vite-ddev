# SilverStripe Starter (Based off DDEV, Vite)

This code repository contains an opinionated Silverstripe setup to use as a
starter or reference for a better local development setup.

## Key Features

-   [DDEV](https://ddev.readthedocs.io/en/stable/) powering the local development environment
-   [Yarn](https://yarnpkg.com/) setup for typescript and react.
-   [Vite](https://vitejs.dev/) tooliing for building assets with live-reload on local.
-   [Storybook](https://storybook.js.org/) for component based front-end development.

## Installation

If you've never used DDEV before, follow the installation instructions on their [website](https://ddev.readthedocs.io/en/stable/).

## How to use

To use this as a starter for your project either copy the relevant files into
your own project repository or, if you have a new project you can use this as
a starter by cloning it and removing the history.

```
git clone git@github.com:heyday/silverstripe-starter-vite-ddev.git silverstripe-project
cd silverstripe-project
rm -rf .git
git init
git remote add origin <your_project_repo>
```


Before using the code within this repository I recommend replacing any
references of `sitename` in the folder to your project specific name
(i.e awesome-website-name) so that they don't clash when you have multiple
projects on the go.

At the very least the following files will need to be updated with your correct
project naming:

- /package.json
- /composer.json
- /.ddev/.env
- /.ddev/config.yaml

After updating the project with your references, time to do a system check.

Start the docker containers:

```sh
ddev start
```

Do a Silverstripe database build

```sh
ddev sake dev/build
```

Setup yarn

```sh
ddev yarn
```

Check your project works at the ddev site URL and perform an initial commit to git.

```sh
git init
git remote add origin <your-project@bitbucket>
git add .
git commit -a -m "initial commit"
```

Now start coding, you fantastic human being.

## Using the frontend

```sh
ddev yarn dev
```

This will run a local Vite dev server which supports hot reload for components.
All front-end dependancies and code is managed under `/app/client` and this
repository includes a sample React component.

The relevant plumbing for the backend server and Hot Module replacement is in the
`app/templates/Includes/Requirements.ss` file.

## Default CMS login

Username: **admin**
Password: **admin**

## React components within Silverstripe

In order to leverage the latest technologies you can build your front-end using
React components. A `Banner` component has been setup as a demonstration but
the steps to use it is something like:

1. Write your JSX component in `app/client/src/components/` with props etc
2. Register your component in `app/client/src/state/Registry`.
3. Pass your data from the Silverstripe template to React `<div data-component="ComponentName"></div>`

Props can be passed to the ComponentName by using `data-props='{}'` which takes
a JSON string of the state. Because writing JSON in templates is annoying, I
recommend generating the JSON in PHP.

```php
public function getBannerProps(): string
{
    return json_encode([
        'title' => (string) $this->Title,
    ]);
}
```

I also highly recommend utilising the partial caching within Silverstripe to
make the component highly efficient (https://docs.silverstripe.org/en/5/developer_guides/performance/partial_caching/)

```html
<% cached 'banner', $ID, $LastEdited %>
<div data-component="Banner" data-props="{$BannerProps}"></div>
<% end_cached %>
```

While this is used for React you could also replace the function with something
similar for Web Components or Vue (or nothing at all if you prefer plain HTML).
