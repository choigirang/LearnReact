import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// useState라는 hook은 React에서 기본적으로 제공하는 함수이다.

function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>


}
function Nav(props){
  const lis = []
  for(let i=0; i< props.topics.length; i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      // 아래에 Number를 사용하는 이유, 우리가 부여한 id는 숫자이지만
      // id의 속성값으로 들어가는 id는 문자가 된다.
      // 따라서 기본적으로 설정한 id의 숫자와 내가 클릭한 태그의 속성값
      // id가 맞는가 비교하기 위해 클릭한 태그의 속성값을 다시 숫자로 바꿔줘야 한다. 
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
      // 내가 선택한 
    }}>{t.title}</a></li>)
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
  //const mode = 'WELCOME';
    //const _mode = useState('WELCOME');
  // 지역번수인 mode를 상태로 업그레이드 한다.
  // _mode는 ['WELCOME',f]를 갖고 있는 배열이다.
  // _mode[0] = 'WELCOME' 상태의 값, _mode[1] = function() 값을 바꾸는 함수이다.
  // useState의 인자는 state의 초기값이다. 초기값 WELCOME
    //const mode = _mode[0];
  // mode에는 상태의 값이 담긴다.
    //const setMode = _mode[1];
  // setMode에는 값을 바꾸고 싶을 때 사용하는 함수가 담겨있다.
  // 위의 코드를 간략화 시키면 아래의 코드이다.
  const [mode, setMode] = useState('WELCOME')
  // 변수명은 아무거나 입력해도 상관없다.
  const [id, setId] = useState(null)
  // 추가적으로 Article에 나타나는 문구로 무엇을 클릭했는지 알고싶다.

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'java', body:'java is ...'}
  ]

  let content = null;
  // 아무것도 정의하지 않음 null
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello,WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    // Article에 들어갈 값은 초기화
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        // 비교하는 id는 내가 클릭하여 변경된 상태 useState인
        // id를 말한다.
        title = topics[i].title;
        body = topics[i].body;
      }
      // if를 안 쓰면 li의 아이디가 모두 담기기 때문에
      // 내가 클릭한 li의 id와 맞는지 비교를 해줘야한다.
    }
    content = <Article title={title} body={body}></Article>
  }

  return(
    <div>
      <Header title="REACT" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
          //mode = 'READ';
        // li를 클릭했을 때 mode를 READ로 바꿔 Article에 READ를 출력하고 싶지만
        // 값은 바뀌지 않는다. li를 눌러도 App이 다시 실행되는 것이 아니기에
        // return 값에는 변화가 없다.
        // 우리가 하고 싶은 것: mode의 값이 바뀌면 App이 새로 실행되면서
        // return 값이 바뀌고, return 값이 ui에 반영되는 것

        // state를 사용한다.
        setMode('READ');
        // 그냥 mode = 'READ'를 사용하면 li를 Nav를 클릭했을 때
        // mode는 READ를 갖게 되지만 아무런 변화를 나타내지 않기 때문에
        // 값을 바꾸고 싶을 때의 함수인 setMode에 부여되고
        // App 컴포넌트가 다시 실행되며 바뀐 값을,바뀐 return을 출력한다.
        setId(_id)
        // Nav안에 클릭한 태그의 정보가 담긴 _id
      }}></Nav>
      {/* <Article title="Welcome" body="Hello, Web"></Article> 
        mode에 따라 Article의 값을 바꿔주고 싶기 때문에 Article을
        삭제하고 content에 Article을 부여한다.
      */}
      {content}
    </div>
  )
}

export default App;
