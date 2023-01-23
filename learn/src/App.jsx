// commit test
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

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
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
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

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      // submit은 클릭을 했을 때 페이지가 리로드 된다.
      // 이것을 막는다.
      const title = event.target.title.value
      // submit 버튼을 눌렀을 때 발생하는 event는 form 태그를 가르키기 때문에
      // name이 title인 태그의 value를 가져온다.
      const body = event.target.body.value;
      // title,body 질문
      props.onCreate(title,body);
    }}>
      {/* 정보를 전송하기 위한 form */}
      <p><input type="text" name='title' placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="create"/></p>
    </form>
  </article>
}

function App(){
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null)
  const [topics, setTopics] = useState([
    // Creat를 통해 input을 하고, input한 value 값인 title과 body를
    // topics안에다가 넣어야 하기 때문에 topics도 상태로 만들어
    // 새로운 값을 가질 수 있도록 한다.
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'java', body:'java is ...'}
  ]);
  const [nextId, setNextId] = useState(4);
  // Create를 통해 객체의 title과 body는 추가되지만 id는 추가되지 않는다.
  // 새롭게 추가되는 topics 객체에 id를 추가하는 방법은 여러가지가 있겠지만
  // id만 따라 빼고 값이 변하는 상태를 만들기 위함, 이미 앞에 1,2,3의 id가
  // 있기 때문에 초기값은 4부터 시작하면 된다.

  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello,WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }else if(mode === 'CREAT'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      // 상태가 string,boolean,number ... 등의 원시자료라면 그래도 사용하면 되지만
      // 상태가 object,array 같이 참조자료라면 이것을 복제한 후 상태를 변경해야 한다.
      // 우리가 topics안에 추가하려 하는데 이때, topics는 객체이기 떄문에
      // newTopics를 만들어 복제를 해주어야한다.
      newTopics.push(newTopic);
      setTopics(newTopics)
      setMode('READ');
      setId(nextId);
      setNextId(nextId++);
      // 추가된 id를 계속 추가시키고, 추가된 내용을 볼 수 있으며
      // creat input 창이 닫아지도록 READ로 바꿔준다.
    }}></Create>
  }
  // 예) const [value, setValue] = useState([1]);
  // 배열을 가진 value에서
  // value.push(2) - value의 오리지널 값을 바꾼것이다.
  // setValue(value) - 상태는 값의 변화가 없으면 굳이 컴포넌트를
  // 다시 렌더링 하지 않는데, 우리는 오리지널 값을 그대로 추가한 것이기 때문에
  // 상태 변화에 따른 재실행이 일어나지 않는다.
  // 따라서, newValue = [...value] - 오리지널 데이터를 복제하고
  // newValue.push(2) - 추가하고
  // setValue(newValue) 로 상태변화.


  return(
    <div>
      <Header title="REACT" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id)
      }}></Nav>
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE')
        {/* setMode의 상태가 Create가 되었을 때*/}
      }}></a>
    </div>
  )
}

export default App;
