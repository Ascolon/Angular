import { UserService } from './../services/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UpdateDataService } from '../services/updateData.service';
import { topItemAnimation } from '../animations/app.animation';
import { Subscription } from 'rxjs';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  providers: [],
  animations: [
    topItemAnimation
   ]
})
export class FilmComponent implements OnInit {
  
  //строка вида 12:11 в которой [0] это id из БД. [1] это id в списке this.Comments
  current_editable_commentId: string = '';
  // id авторизованого полльзователя
  user_id: number;
  // текущая аватарка пользователя
  current_user_avatar: string;
  // комментарии
  Comments: any[];
  // отвечает за применение класса если этот фильм и избраного пользователя
  IsLike: Boolean = false;
  // отвечает за оповещени если надо авторизоватся для добавления в избраное
  showElseNeedLoginForLike: Boolean = false;
   // отвечает за оповещени если надо авторизоватся для добавления коммента
  showElseNeedLoginForComment: Boolean = false;
   // отвечает за отображения блока для добавления комментария
  showElseNeedLoginForCommentBlock: Boolean = true;
  // отвечате за отображение блока об ошибке запроса
  failed: Boolean = false;
  // отвечает за отображение лоадера
  loading: Boolean = false;
  // отображает за отображение того что подгружается блок комментариев
  upload: Boolean = false;
  // id  текущего фильма
  film_id: number;
  // текущий фильм получены из ответа запроса
  movie;
  // если будет ошибка при добавление коммента = true
  error_comment = false;
  // хранит текущее состояние воспроизведения плеера
  playible: Boolean = true;
  // текст всплывающей подсказки при добавлении или удалении из избраного
  add_favorite_result: String = '';
  // отвечает за отображение блока который оповещает о добавлении или удалении из избраного
  add_favorite_change: Boolean = false;
  // отображает количество комментрнаии к фильму
  CommentCount: number = 0;
  // отвечает за включени режима редактирвоания комментария
  edit_mode = false;
  // подписка на изменеие роута для отслежевания перехода.(Для истории просморта фильма)
  changeRoute: Subscription;
  // отвечает за отображение блока который рпедлоагет прододить просмотри фильма
  // при условии что этот фильм был просмотрен последним
  isLastViewed: boolean = false;
  // хранить информацию о последнем просмотреном фильме
  lasViewedMovie: any;


  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private userService: UserService, private setting: SettingService,
              private updateData: UpdateDataService, private router: Router) {
   }


  // выполнится при инициализации компонента
  // выполнит проверку если пользователь авторизован то обновит данные компонента
  // получиние id фильма из входящего параметра
  // загрузка фильма по получено му id
  // подписка на событие обновления данных
  ngOnInit() {
    this.film_id = +this.activatedRoute.snapshot.params['id'];
    if (this.userService.IsAutorization()) {
      this.user_id = this.userService.getUSer().Id;
      this.updateData.updateWhenAuthorized();
    } else {
      this.user_id = -1;
      this.updateData.updateWhenLogout();
    }
    this.initSubscribe();
    this.startLoad();
    this.subscribeToChangeRoute();
    this.IsLastViewed(); 
  }
  //подписка на измение роута для отслежевания перехода
  subscribeToChangeRoute() {
    if (!this.userService.IsAutorization()) {
      console.log('for info last movie need autorization');
      return;
    }
    this.changeRoute =  this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        const video = <HTMLVideoElement>document.getElementById('video_player');
        if (video.currentTime > 0 && video.currentTime < video.duration) {
          this.setting.setLasViewedMovie({
            film: this.film_id,
            time: video.currentTime
          });
        }
        this.changeRoute.unsubscribe();
      }
    });
  }
  // загрузка фильма по указаному id
  startLoad() {
    this.failed = false;
    this.loading = true;
    this.httpService.getFilmById(this.film_id, this.user_id).subscribe((s) => {
      document.getElementById('first-view').style.backgroundImage = `url('${s.json().Pagebg}')`;
      this.movie = s.json();
      console.log(s.json());
      this.IsLike = this.movie.IsFavorite;
      this.CommentCount = this.movie.CommentCount;
      this.Comments = (<Array<any>>(s.json().Comments));
    }, (e) => {
      this.loading = false;
      this.failed = true;
    },
    () => {
      this.loading = false;
      this.failed = false;
    });
  }
  // присходит при добавление или удалении из избраного
  like() {
    if (!this.userService.IsAutorization()) {
      console.log('Need Login!!');
      return;
    }
    this.httpService.addfavorite(this.movie.FilmId, this.userService.getUSer().Id).subscribe((s) => {
      this.IsLike = s.json().show;
      this.movie.InFavorites = s.json().InFavorites;
      }, (e) => {},
      () => {
        this.add_favorite_change = true;
        this.add_favorite_result = this.IsLike ? "Добавлено в избраное" : "Удалено из избраного";
        setTimeout(() => {
          this.add_favorite_change = false;
        }, 2000);
      }
    );

  }
  // добавляет комментарий к фильму
  // text - текст для комментария
  addComment(text: string) {

    const txt = text.replace(/\n/g, '<br/>');
    console.log(txt);
    this.httpService
    .addComment(this.movie.FilmId, txt, this.userService.getUSer().Id).subscribe((r) => {
      if (r.json().error) {
        this.error_comment = true;
        setTimeout(() => { this.error_comment = false; }, 1500);
        return;
      }
      if (r.json().updated === true) {
        this.Comments[0] = r.json().comment;
      }
      if (r.json().updated === false) {
        this.Comments.unshift(r.json().comment);
        this.CommentCount++;
      }
    }, (e) => {}, () => {});
  }
  // вернет истина если пользователь авторизован
  needAutorization() {
    return this.userService.IsAutorization();
  }
  // расчитывает высоту блока для комментариев в зависимости от количеста текста в нем
  // target -  textarea для комментария
  appendBr(target) {
    const textarea = <HTMLElement>target;
    setTimeout(() => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, 0);
  }
  // при клике по tag video ставит паузу если play иначе pause
  // v video-tag
  setPause(v) {
    if (v.paused) {
      v.play();
      this.playible = false;
      return true;
    }
    if (!v.paused) {
      v.pause();
      this.playible = true;
      return false;
    }
  }
  // подгрузит еще комментарии для данного фильма.
  uploadComment() {
    this.httpService.uploadComment(this.Comments.length, this.movie.FilmId).subscribe( r => {
      for (const comment of r.json()) {
        this.Comments.push(comment);
      }
    }, e => {
      this.upload = false;
    }, () => {
      this.upload = false;
    });
  }
  // заносит текст коммента в  поле ввода дял редактирвоания коммента
  // получает id коммента в this.Comments и id коммента на сервере
  // element - id коммента в this.Comment
  // commentId - id коммента на сервере
  prepareEditComment(element: number, commentId: number) {

    const pattern = new RegExp('<br/>', 'g');
    const area = <HTMLTextAreaElement>document.getElementById('text_area');
    area.value = this.Comments[element].Text.replace(pattern, '\n')
    this.appendBr(area);
    this.current_editable_commentId = `${commentId}:${element}`;
    this.edit_mode = true;
    area.focus();

    // const txt = area.value.replace(/\n/g, '<br/>');
    // this.httpService.editComment(index, txt).subscribe((r) => {
    //   console.log(r.json());
    // }, (e) => { }, () => { }); 
  }
  // отправляет отредактированный коммент на сервер
  editComment() {

   
    const area = <HTMLTextAreaElement>document.getElementById('text_area');

    const txt = area.value.replace(/\n/g, '<br/>');
    const indexes = this.current_editable_commentId.split(':');
    this.httpService.editComment(+indexes[0], txt).subscribe((r) => {
      this.Comments[0] = r.json();
      console.log(r.json());
    }, (e) => { }, () => { this.edit_mode = false; this.appendBr(area) }); 
  }

  // вернет истина если текущий пользователь автор комментария иначе ложь
  // authot - логин текущего пользователя
  IsMyComment(author) {
    if(!this.userService.IsAutorization()) {
      return false;
    }
    return this.userService.getUSer().Name === author;
  }
  // подписка на изменение данных  при  авторизации или выходе
  initSubscribe() {
    this.updateData.film_current_user_avatar.subscribe(data => { this.current_user_avatar = data; });
    this.updateData.film_showElseNeedLoginForCommentBlock.subscribe(data => {
      this.showElseNeedLoginForCommentBlock = data;
    });
  }
  // сместит блок с видео если проскроленно ниже блока с видео
  // сработает если видео в режиме воспроизведения
  slideVideoToRight(event) {
    const offset = document.getElementById('chains').getBoundingClientRect();
    const videoplayer = document.getElementsByTagName('video')[0];
    const video = document.getElementById('if_video_move');

    if ( (offset.top < 0 || offset.bottom > window.innerHeight) && !videoplayer.paused) {
      video.classList.add('slideVideoToRight');
    }
    if (offset.top > 0 && offset.bottom < window.innerHeight) {
      video.classList.remove('slideVideoToRight');
    }
  }
  // проверка последнего фильма который был просмотрен
  // Если совпадает то предлогает продолжить просмотр
  IsLastViewed() {
    if (!this.setting.getLasViewedMovie()) {
      console.log("LastViewed Not Found");
      return;
    }
    this.lasViewedMovie = this.setting.getLasViewedMovie();
    if (this.lasViewedMovie !== null && this.lasViewedMovie.hasOwnProperty('film')) {
      if (this.lasViewedMovie.film === this.film_id) {
        this.isLastViewed = true;
      }
    }
  }
  // продолжить просмотр последнего просматриваемого фильма
  continueBrowsing() {
    const videoplayer = document.getElementsByTagName('video')[0];
    const scrolable = document.getElementById('scrolable');

    scrolable.scrollTop = videoplayer.getBoundingClientRect().top - 50;
    videoplayer.currentTime = this.lasViewedMovie.time;
    this.isLastViewed = false;
  }
}
