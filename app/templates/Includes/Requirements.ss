<% if $IsDevHot %>
<script type="module" nonce="{$Nonce}">
  import RefreshRuntime from '{$ViteBaseHref}/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.\$RefreshReg\$ = () => {}
  window.\$RefreshSig\$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
</script>

<script type="module" nonce="{$Nonce}" src="{$ViteBaseHref}/@vite/client"></script>
<script type="module" nonce="{$Nonce}" src="{$ViteBaseHref}/app/client/src/index.js"></script>
<% else %>
$IncludeRequirements
<% end_if %>
