import logo from './logo.svg';
import './App.css';
function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
      // App에 작성된 Header 컴포넌트의 props 중
      // onChangeMode 함수를 실행시킨다.
    }}>{props.title}</a></h1>
    {/* 위에 작성된 Html 태그는 순수한 Html 태그와 똑같지 않으며
    유사 Html 코드이다. 위에 사용하는 코드는 React가 최종적으로
    Html에 사용할 코드로 변경해주는 것이기 때문에 같지 않다.*/}
  </header>


}
function Nav(props){
  const lis = []
  for(let i=0; i< props.topics.length; i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      // key는 React의 식별을 위한 역할로
      // id는 Html 코드에 들어갈 id로
      event.preventDefault();
      props.onChangeMode(event.target.id);
      // event 객체가 갖고 있는 target
      // target은 event를 유발시킨 태그를 가르킨다.(<a>)
      // a가 갖고 있는 props 중 id
    }}>{t.title}</a></li>)
    // t는 props.topics[i]를 가르킨다.
    // props는 Nav컴포넌트의 prop를 받아오는데
    // 이 prop들 중 topics는 App안에 있는 Nav의 topics를
    // 가르키고, topics는 App에 선언된 객체를 가진 배열인
    // topics를 받아온다.
    // 따라서, for문이 돌아가며 변수 topics의 0,1,2번 째 인덱스를
    // 가르키고, 가르킨 인덱스의 객체 중 title 키를 출력한다.
  }
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
  ]

  return(
    <div>
      <Header title="REACT" onChangeMode={()=>{
        alert('Header')
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        // onChangeMode 함수는 a태그에서 onClick이벤트가 발생했을 때
        // 호출되고 매개변수인 id는, event.target에 의해 a태그를 가르켜
        // a 태그의 id이다
        alert(id)
      }}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  )
}

export default App;
