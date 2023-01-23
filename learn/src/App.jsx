import logo from './logo.svg';
import './App.css';
function Header(props){
  return <header>
    <h1><a href="/">{props.title}</a></h1>
    {/* props는 Header 컴포넌트가 가지는 여러가지의 속성을 말하는데
      props는 Object이다.
      ex) Header title="" alt="" name="" / title,alt,name은 prop
    */}
  </header>
}
// 각각의 컴포넌트 만들기
function Nav(props){
  // Nav 컴포넌트가 가지는 prop을 props매개변수로
  const lis = [
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  ]
  for(let i=0; i< props.topics.length; i++){
    let t = props.topics[i]
    // Nav컴포넌트의 props 중 topics, 그 topics는
    // 변수로 선언되어 topics 배열 안의 객체들
    lis.push(<li key={t.id}><a href={'/read/'+t.title}></a></li>)
    // 나중에 동적으로 배열이 추가되거나 정렬될 때, 순서가 달라질 수 있다.
    // 최신순서로 정렬을 한다고 하면, React에서는 처음부터 새로 작성되지 않고
    // 작성돼있던 것들을 활용하려고 한다.
    // 이 때, 이미 작성된 것들을 구분 짓기 위해 React에서 식별할 'key'가 필요하고
    // key는 엘리먼트나 컴포넌트, 모두 사용해도 되지만 반복을 하는 곳에
    // 식별하기 위해 사용되어야 한다.
  }
  // 보통 반복되는 작업을 할 때 map을 사용하지만
  // 단순화 시켜서 for문 사용
  return (
    <nav>
        <ol>
          {lis}
        </ol>
      </nav>
  )
}

function Article(props){
  return(
    <article>
        <h2>{props.title}</h2>
      </article>
  )
}

function App(){
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'java', body:'java is ...'}
    // id는 고유한 값을 가져야하며 정보들을 가지는 것은
    // 객체에 담으면 좋다.
  ]

  return(
    <div>
      <Header title="REACT"></Header>
      {/* props는 변수명처럼 작용한다. */}
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  )
}

export default App;
