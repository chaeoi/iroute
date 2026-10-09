# iRoute

iRoute 是一个轻量的 App Store 地区切换页面。打开页面后直接点击地区，使用 Apple 的 `resetAndRedirect` 入口切换对应 storefront，不需要二次确认。

## 使用

```bash
python3 -m http.server 8765
```

浏览器访问 `http://127.0.0.1:8765/`。在 iOS 上，地区按钮会通过 `itms-apps://` 协议直接打开 App Store。

## 结构

```text
index.html          页面和直达链接
assets/styles.css   响应式布局与视觉样式
images/icon.svg     自制站点图标
```

站点图标使用 [Streamline](https://streamlinehq.com/) 的 `world-flat` 图标，已下载为本地 SVG，避免运行时依赖。

## 响应式布局

- 手机端：全部 64 个地区每行 4 个；常用地区只显示国旗，其他地区只显示两字缩写。
- iPad/电脑端：全部 64 个地区每行 8 个，统一国旗尺寸并显示中文名称。
- 卡片使用浅蓝灰底和旗面边框，避免白色国旗与背景融为一体。
- 所有网格列数均与条目数量整除，确保每一行都是满行；矮屏只压缩尺寸，不改变列数规则。
- 常用地区使用统一的 `flag-icons` SVG 资源；中国台湾按钮使用中国国旗。

已覆盖的 iPad 常见 CSS 视口包括 `768×1024`、`820×1180`、`834×1194`、`1024×1366` 及对应的横屏尺寸。

## 部署

项目是纯静态站点，可直接部署到 Cloudflare Pages：

```bash
wrangler pages deploy . --project-name iroute --commit-dirty=true
```
