import React, { useEffect } from 'react';
import { Route } from "react-router-dom"
import Home from "./pages/Home";
import Notice from "./pages/notice/Notice";
import NoticeRead from "./pages/notice/NoticeRead";
import Faq from "./pages/faq/FAQ";
import FAQRead from "./pages/faq/FAQRead";
import NoticeWrite from "./pages/notice/NoticeWrite";
import { Switch } from "react-router-dom";
import NoticeEdit from "./pages/notice/NoticeEdit";
import FaqWrite from "./pages/faq/FAQWrite";
import FaqEdit from "./pages/faq/FAQEdit";
import IDEReader from "./pages/ide/IDEReader";
import UserHome from "./pages/userpage/UserHome";
import IDEEditor from "./pages/ide/IDEEditor";
import Callback from './pages/oauth/Callback';
import useLogin from "./hooks/useLogin";
import ContestSkel from "./pages/content/contest/ContestSkel";
import ContestAll from "./pages/content/contest/ContestAll";
import ContestWrite from "./pages/content/contest/ContestWrite";
import SearchResult from "./pages/home/SearchResult";

const App = () => {
  const { saveLoginDataInRedux } = useLogin()

  useEffect(() => {
    saveLoginDataInRedux()
  }, [])

  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:text" component={SearchResult} />

      {/* notice 공지사항 라우터 */}
      <Switch>
        <Route exact path="/notice" component={Notice} />
        <Route exact path="/notice/write" component={NoticeWrite} />
        <Route path="/notice/edit/:number" component={NoticeEdit} />
        <Route path="/notice/:number" component={NoticeRead} />
      </Switch>

      {/* qna 자주뭍는질문 라우터 */}
      <Switch>
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/faq/write" component={FaqWrite} />
        <Route exact path="/faq/edit/:number" component={FaqEdit} />
        <Route exact path="/faq/:number" component={FAQRead} />
      </Switch>

      {/* IDE 라우터 */}
      <Switch>
        { /* @ts-ignore */}
        <Route exact path="/ide/edit/:type/:origin/:puuid" component={IDEEditor} />
        { /* @ts-ignore */}
        <Route exact path="/ide/:type/:origin/:puuid" component={IDEReader} />
      </Switch>

      {/* Contest 라우터 */}
      <Switch>
        <Route exact path="/contest" component={ContestAll} />
        <Route exact path="/contest/write" component={ContestWrite} />
        <Route exact path="/contest/:uuid" component={ContestSkel} />
        <Route exact path="/contest/:uuid/write" component={ContestSkel} />
        <Route exact path="/contest/:uuid/read/:qno" component={ContestSkel} />
        <Route exact path="/contest/:uuid/edit/:qno" component={ContestSkel} />
      </Switch>

      {/* UserHome 라우터 */}
      <Route exact path="/user" component={UserHome} />

      {/* OAuth 콜백 */}
      <Route exact path="/oauth/callback" component={Callback} />

    </div>
  );
};

export default App;
