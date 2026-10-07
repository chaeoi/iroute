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

## 响应式布局

- 手机端：常用地区每行 3 个，缩写地区每行 13 个。
- 电脑端：常用地区每行 4 个，缩写地区每行 26 个。
- 常用地区使用统一的 `flag-icons` SVG 资源；中国台湾按钮使用中国国旗。

## 部署

项目是纯静态站点，可直接部署到 Cloudflare Pages：

```bash
wrangler pages deploy . --project-name iroute --commit-dirty=true
```
