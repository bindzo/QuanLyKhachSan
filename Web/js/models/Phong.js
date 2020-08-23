function Phong(maphong,loai,ghichu,tinhtrang) {
    this.maphong = maphong;
    this.loai = loai;
    this.ghichu = ghichu;
    switch(loai){
        case 'A': this.gia = 150000;break;
        case 'B': this.gia = 170000;break;
        case 'C': this.gia = 200000;break;
    }
    this.tinhtrang = tinhtrang;
  }

