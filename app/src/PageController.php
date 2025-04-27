<?php

namespace {

    use Psr\SimpleCache\CacheInterface;
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Control\Director;
    use SilverStripe\Core\Environment;
    use SilverStripe\Core\Injector\Injector;
    use SilverStripe\ORM\ArrayList;
    use SilverStripe\View\ArrayData;
    use SilverStripe\View\Requirements;

    class PageController extends ContentController
    {
        private static $allowed_actions = [];

        /** @var boolean */
        protected $hot_vite_server_enabled = true;

        public function IsDevHot()
        {
            return Director::isDev() && $this->hot_vite_server_enabled;
        }

        public function getViteBaseHref(): string
        {
            if (Director::is_https()) {
                return rtrim(Director::absoluteBaseURL(), '/') . ':5174';
            } else {
                return rtrim(Director::absoluteBaseURL(), '/') . ':5173';
            }
        }


        public function buildRequirementsManifest()
        {
            $manifestFile = Director::baseFolder() . '/app/client/dist/manifest.json';

            if (!file_exists($manifestFile)) {
                throw new Exception('client/dist/manifest.json does not exist. Please run `yarn build`');
            }

            $manifest = json_decode(file_get_contents($manifestFile), true);

            if (!$manifest) {
                throw new Exception('client/dist/manifest.json is not valid JSON. Please run `yarn build`');
            }

            return $manifest;
        }

        public function getIncludeRequirements()
        {
            $manifestFile = Director::baseFolder() . '/app/client/dist/manifest.json';

            $m = Environment::getEnv('BUILD_VERSION');

            if (!$m) {
                $m = filemtime($manifestFile);
            }

            $key = 'requirements-manifest-' . $m;
            $cache = Injector::inst()->get(CacheInterface::class . '.RequirementsManifest');

            if (!$cache->has($key) || isset($_GET['flush'])) {
                $manifest = $this->buildRequirementsManifest();
                $cache->set($key, $manifest);
            } else {
                $manifest = $cache->get($key);
            }

            $distPath = 'app/client/dist/';
            $resourcesPath = '/_resources/';

            Requirements::css($distPath . $manifest['app/client/src/index.css']['file']);
            Requirements::javascript($distPath . $manifest['app/client/src/index.js']['file']);

            if ($this->hasMethod('getAdditionalRequirements')) {
                $this->getAdditionalRequirements($manifest);
            }

            $jsModules = ArrayList::create();
            $jsModules->push(new ArrayData([
                'Asset' => $resourcesPath . $distPath . $manifest['app/client/src/index.jsx']['file']
            ]));

            if ($this->hasMethod('getAdditionalRequirements') && ($additional = $this->getAdditionalRequirements())) {
                foreach ($additional as $asset) {
                    if (substr($asset, -4) == '.css' || substr($asset, -5) == '.scss') {
                        Requirements::css($distPath . $manifest[$asset]['file']);
                    } else {
                        $jsModules->push(new ArrayData([
                            'Asset' => $resourcesPath . $distPath . $manifest[$asset]['file']
                        ]));
                    }
                }
            }

            return $this->renderWith('Includes/JSModules', [
                'JSModules' => $jsModules
            ]);
        }


        public function getBannerProps(): string
        {
            return json_encode([
                'title' => (string) $this->Title,
            ]);
        }
    }
}
