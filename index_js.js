
  // JavaScript Document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const heading = $(".name-music");
const audio = $("#audio");
const cdThumb = $(".img-music"); 
const playBtn = $(".pause-play");
const progress = $("#progress");
const nextBtn = $(".fa-step-forward")
const preBtn = $(".fa-step-backward")
const randBtn = $(".fa-random")
const list = $(".list")
const repBtn = $(".fa-redo-alt")
const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	songs: [
			{
				name: "Cưng chiều che chở",
				singer: "Vương Lý Văn",
				img:"https://wx2.sinaimg.cn/mw690/007vJKJ3ly1grw54i8bb8j32c03404qy.jpg",
				path:"https://zalo-file-dl3.zdn.vn/7e50e433c52a2a74733b/5788969808972335051"
			},
			{
				name: "Khi em rời đi",
				singer: "Vương Ân Tín Est & Nhị Bàn U",
				img:"https://wx3.sinaimg.cn/mw690/007vJKJ3ly1gnnfaoa5f2j32c03404qq.jpg",
				path:"https://zalo-file-dl2.zdn.vn/c22a9c48bd51520f0b40/369660333209018317"
			},
			{
				name: "Thế giới của tớ không có cậu",
				singer: "Tô Hàm",
				img:"https://wx2.sinaimg.cn/mw690/007vJKJ3ly1gqkodtbtrsj31rz35se87.jpg",
				path:"https://zalo-file-dl3.zdn.vn/ca7eb41b95027a5c2313/4378389844862005413"
			},
			{
				name: "Thuỷ triều",
				singer: "Phó mộng mộng",
				img:"https://wx4.sinaimg.cn/mw690/007vJKJ3ly1grgz5qtmc3j32c0340x6p.jpg",
				path:"https://zalo-file-dl1.zdn.vn/65481aac3bb5d4eb8da4/2463205368595573191"
			},
			{
				name: "Bại tướng",
				singer: "Nhậm Nhiên",
				img:"https://wx3.sinaimg.cn/mw690/007vJKJ3ly1glhsptdgamj31410u0wox.jpg",
				path:"https://zalo-file-dl2.zdn.vn/0353b5a293bb7ce525aa/5332087481235473634"
			},
			{
				name: "Thuỷ triều (Remix)",
				singer: "Phó mộng mộng",
				img:"https://wx4.sinaimg.cn/mw690/007vJKJ3ly1gjrh2onr37j32bz2v9x6p.jpg",
				path:"https://zalo-file-dl2.zdn.vn/c961ed91cb8824d67d99/7944331148171943112"
			}
		],
	render: function(){
		const htmls = this.songs.map(function(song,index){
			return`
			<div class="song ${
				index === app.currentIndex ? "active2" : ""
			  }" data-index="${index}">
        	<div class ="img-song" style ="background-image: url('${song.img}')"></div>
            <div class ="song-contents">
                <div class="name-song">
                    <h2>${song.name}</h2>
                </div>
                <div class="contents">
                    <h3>${song.singer}</h3>
                </div>
             </div>
        </div>
		`
		})
		$('.list').innerHTML =htmls.join('');
	},

	defineProperties: function () {
		Object.defineProperty(this, "currentSong", {
		  get: function () {
			return this.songs[this.currentIndex];
		  }
		});
	  },
	handleEvents:function(){
		const _this = this
		const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
			duration: 10000, // 10 seconds
			iterations: Infinity
		  });
		  cdThumbAnimate.pause();

		playBtn.onclick = function(){
			if(_this.isPlaying == false){
				audio.play()
			}
			else{
				audio.pause()
			}
		}
		audio.onplay = function(){
			_this.isPlaying = true
			player.classList.add('playing')
			cdThumbAnimate.play();
		}
		audio.onpause = function(){
			_this.isPlaying = false
			player.classList.remove('playing')
			cdThumbAnimate.pause();
		}
		audio.ontimeupdate = function(){
			if(audio.duration){
				const progressPer = Math.floor(audio.currentTime/audio.duration *100);
				progress.value = progressPer;
			}
		}
		progress.onchange = function(e){
			audio.currentTime = e.target.value / 100 * audio.duration;
		}
		
		nextBtn.onclick = function(){
			
			if(_this.isRandom){
				_this.playRandomSong();

			}
			else{
				_this.nextSong();
				
			}
			audio.play();
			_this.render();
			_this.scrollCurrent();
		}
		preBtn.onclick = function(){
			
			if(_this.isRandom){
				_this.playRandomSong();
				
			}
			else{
				_this.preSong();
		
			}
			audio.play();
			_this.render();
			_this.scrollCurrent();
		}
		randBtn.onclick= function(){
			_this.isRandom = !_this.isRandom;
			randBtn.classList.toggle("active",_this.isRandom);
		}
		audio.onended = function(){
			if(_this.isRepeat){
				_this.repeatSong();
			}
			else
			nextBtn.click();
		}
		list.onclick = function(e){
			const songNode =e.target.closest('.song:not(.active2)')
			if (songNode != null){
				_this.currentIndex = Number(songNode.dataset.index);
				_this.loadCurrentSong();
				_this.render();
				audio.play();
			}
		}
		repBtn.onclick = function(){
			_this.isRepeat = !_this.isRepeat;
			repBtn.classList.toggle("active",_this.isRepeat);
		}
	},

	loadCurrentSong: function(){
		
		heading.textContent = this.currentSong.name
		cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
		audio.src = this.currentSong.path
	
	},

	nextSong: function(){
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) this.currentIndex=0;
		this.loadCurrentSong();

	},

	preSong: function(){
		this.currentIndex--;
		if(this.currentIndex < 0) this.currentIndex = this.songs.length-1;
		this.loadCurrentSong();
	},

	playRandomSong: function(){
		let newIndex;
		do{
			newIndex = Math.floor(Math.random() * this.songs.length);
		}while (this.currentIndex === newIndex)

		this.currentIndex = newIndex;
		this.loadCurrentSong();
	},

	repeatSong: function(){
		this.loadCurrentSong();
		audio.play();
	},

	scrollCurrent: function(){
	
			$('.song.active2').scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			})
		
	},

	start: function(){
		this.defineProperties();


		this.handleEvents();


		this.loadCurrentSong();


		this.render();

		
	}
};
app.start();
