# spa 폴더

SPA 페이지 단위로 폴더를 구성하여 페이지 단위의 컴포넌트들을 가지고 있는 폴더 입니다.

예를 들어 Login 페이지라고 한다면,

### SPA

- components
- login
  - components
  - login.vue
- Home.vue
- NotFound.vue

이렇게 구성되어 있을 것 입니다.

그리고 해당 vue 파일의 style 템플릿의 길이가 길어질 수 있으므로,
.scss 파일을 분리하여 해당 프로젝트의 HelloWorld.vue, scss 파일 처럼 나타낼 수 있습니다.

scss 파일을 분리할 때 style 필드에 

````html
  <style lang="scss" src="./HelloWorld.scss"></style>
````

위와 같이 코딩하면 scss 파일을 불러올 수 있습니다.

### spa/components

페이지에서 공통적으로 사용되는 컴포넌트들을 넣습니다.

상단의 shared-components와 다른 점은 shared-components는 spa 이동시에 데이터가 변경되지 않습니다.

하지만 components는 spa 내에서 데이터가 움직이는 정보에 대해 폴더안에 파일을 넣으시면 됩니다.

### spa/페이지명

페이지명으로 폴더를 구성하시면 됩니다.

해당 페이지 폴더, 내에 components 폴더들이 들어가 있어서 자유롭게 코딩하시면 됩니다.
