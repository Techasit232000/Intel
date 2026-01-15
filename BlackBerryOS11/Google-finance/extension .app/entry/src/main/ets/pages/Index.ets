@Entry
@Component
struct Index {
  build() {
    Column() {
      Text('Hello HarmonyOS')
        .fontSize(26)
        .fontWeight(FontWeight.Bold)
        .margin(20)
      Text('This app is ready to upload to Huawei AppGallery.')
        .fontSize(16)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}