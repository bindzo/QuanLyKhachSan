function Guest(makh, ten, loai, cmnd, diachi, mathue) {
    this.makh = makh;
    this.ten = ten;
    this.loai = loai;
    this.cmnd = cmnd;
    this.diachi = diachi;
    if (!mathue) {
      this.mathue = "chưa thuê";
    } else this.mathue = mathue;
  }

