## 전체 댓글 목록 페이지에서 홈으로 갈때의 이전 스크롤 위치 기억

hooks 폴더 안에 UseScroll.js을 보면

첫 페이지에서 오른쪽 상단에 있는 전체 댓글 버튼을 눌렀을 때

댓그목록 컴포넌트가 나오는데 이때 스크롤을 맨 상단으로 올라가는 것은 가능하나,

다시 웹툰이 보이는 홈으로 왔을 때 이전에 위치했던 스크롤로 이동하도록 구현하고 싶은데

window.scrollTo 매서드가 적용되지 않으며

전체 홈에서의 스크롤 값을 scrollY에 저장하는데에도 값이 0이 나올 때도 있습니다.
