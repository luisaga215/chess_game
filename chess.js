$(document).ready(function() {

  var turn = "white" //First turn

  /*dinamically create the board*/
  $("[piece]").each(function() {
    let player = $(this).attr("player")
    if (player == "") {
      return
    } else {
      let color = $(this).css("background-color")
      let piece = $(this).attr("piece")
      let url = "url(./Pieces/" + player + "/" + piece + ".png)"

      $(this).css("background", "url(./Pieces/" + player + "/" + piece + ".png)")
      if (piece == "pawn") {
        var size = "65px"
      } else {
        var size = "74px"
      }
      $(this).css("background-size", size)
      $(this).css("background-position", "center")
      $(this).css("background-repeat", "no-repeat")
      $(this).css("background-color", color)
    }
  })

  /*Dictionary to save the current selected piece*/
  currentPieceSel = {
    player: "",
    piece: "",
    row: "",
    col: ""
  }

  /**/
  $("[piece]").click(function() {
    var player = $(this).attr("player")
    var piece = $(this).attr("piece")
    var row = Number($(this).attr("row"))
    var col = Number($(this).attr("col"))
    /*Clicked piece color match with current player turn (select piece to move)*/
    if (player == turn) {
      $("[piece!='']").each(function() {
        if ($(this).hasClass("square-white")) {
          $(this).css("background-color", "white")
        } else if ($(this).hasClass("square-black")) {
          $(this).css("background-color", "#5e2129")
        }
      })
      $(this).css("background-color", "#39ff14")
      currentPieceSel = {
        player: player,
        piece: piece,
        row: Number(row),
        col: Number(col)
      }
      return
      /*Check cases where there is an already selected piece and the clicked space is not a piece of the current player*/
    } else if (player != turn && currentPieceSel.player != "") {
      if (currentPieceSel.piece == "pawn") {
        if (player == "") {
          if (pawnCanMove(row, col)) {
            movePiece(row, col)
          } else {
            console.log("invalid move")
          }
        } else {
          if (pawnCanEat(row, col)) {
            movePiece(row, col)
          } else {
            console.log("invalid move");
          }
        }
      } else if (currentPieceSel.piece == "rook") {
        if (rookCanMove(row, col)) {
          movePiece(row, col)
        } else {
          console.log("invalid move")
        }
      } else if (currentPieceSel.piece == "knight") {
        if (knightCanMove(row, col)) {
          movePiece(row, col)
        } else {
          console.log("invalid move")
        }
      } else if (currentPieceSel.piece == "bishop") {
        if (bishopCanMove(row, col)) {
          movePiece(row, col)
        } else {
          console.log("invalid move")
        }
      } else if (currentPieceSel.piece == "queen") {
        if (queenCanMove(row, col)) {
          movePiece(row, col)
        } else {
          console.log("invalid move")
        }
      } else if (currentPieceSel.piece == "king") {
        if (kingCanMove(row, col)) {
          movePiece(row, col)
        } else {
          console.log("invalid move")
        }
      }
    }
  })

  /*Returns true if the selected pawn in currentPieceSel dictionary can move to t_row, t_col pos*/
  function pawnCanMove(t_row, t_col) {
    let col = currentPieceSel.col
    if (currentPieceSel.player == "white") {
      if (currentPieceSel.row == 2 && t_row == 4 && t_col == currentPieceSel.col) {
        if ($("[row='3'][col=" + col + "]").attr("player") == "") {
          return true
        } else {
          return false
        }
      } else if (t_row == (currentPieceSel.row + 1) && t_col == currentPieceSel.col) {
        return true
      } else {
        return false
      }
    } else {
      if (currentPieceSel.row == 7 && t_row == 5 && t_col == currentPieceSel.col) {
        if ($("[row='6'][col=" + col + "]").attr("player") == "") {
          return true
        } else {
          return false
        }
      } else if (t_row == (currentPieceSel.row - 1) && t_col == currentPieceSel.col) {
        return true
      } else {
        return false
      }
    }
  }

  function pawnCanEat(t_row, t_col) {
    let row = currentPieceSel.row
    let col = currentPieceSel.col

    if (currentPieceSel.player == "white") {
      if ((t_row == row + 1 && t_col == col + 1) || (t_row == row + 1 && t_col == col - 1)) {
        return true
      } else {
        return false
      }
    } else {
      if ((t_row == row + -1 && t_col == col + 1) || (t_row == row + -1 && t_col == col - 1)) {
        return true
      } else {
        return false
      }
    }
  }

  /*Returns true if the selected rook in currentPieceSel dictionary can move to t_row, t_col pos*/
  function rookCanMove(t_row, t_col) {
    let row = currentPieceSel.row;
    let col = currentPieceSel.col;
    if (t_row == row) {
      if (t_col > col) {
        for (let i = col + 1; i < t_col; i++) {
          if ($("[row=" + row + "][col=" + i + "]").attr("player") != "") {
            return false
          }
        }
        return true
      } else if (t_col < col) {

        for (let i = col - 1; i > t_col; i--) {
          if ($("[row=" + row + "][col=" + i + "]").attr("player") != "") {
            return false
          }
        }
        return true
      }
    } else if (t_col == col) {
      if (t_row > row) {
        for (let i = row + 1; i < t_row; i++) {
          if ($("[row=" + i + "][col=" + col + "]").attr("player") != "") {
            return false
          }
        }
        return true
      } else if (t_row < row) {
        for (let i = row - 1; i > t_row; i--) {
          if ($("[row=" + i + "][col=" + col + "]").attr("player") != "") {
            return false
          }
        }
        return true
      }
    } else {
      return false
    }
  }

  /*Returns true if the selected horse in currentPieceSel can move to t_row, t_col coordinates*/
  function knightCanMove(t_row, t_col) {
    let row = currentPieceSel.row;
    let col = currentPieceSel.col;
    if ((t_row == row + 2 && t_col == col + 1) || (t_row == row + 2 && t_col == col - 1) || (t_row == row + 1 && t_col == col + 2) || (t_row == row - 1 && t_col == col + 2) || (t_row == row - 2 && t_col == col + 1) || (t_row == row - 2 && t_col == col - 1) || (t_row == row + 1 && t_col == col - 2) || (t_row == row - 1 && t_col == col - 2)) {
      return true
    } else {
      return false
    }
  }

  /*Returns true if the selected bishop in currentPieceSel can move to t_row, t_col coordinates*/
  function bishopCanMove(t_row, t_col) {
    let row = currentPieceSel.row
    let col = currentPieceSel.col

    if (t_row != row && t_col != col && Math.abs(t_col - col) == Math.abs(t_row - row)) {
      if (t_row > row && t_col > col) {
        for (let i = row + 1; i < t_row; i++) {
          if (++col < t_col) {
            if ($("[row=" + i + "][col=" + col + "]").attr("player") != "") {
              return false
            }
          }
        }
        return true;
      } else if (t_row < row && t_col > col) {
        for (let i = row - 1; i > t_row; i--) {
          if (++col < t_col) {
            if ($("[row=" + i + "][col=" + col + "]").attr("player") != "") {
              return false
            }
          }
        }
        return true
      } else if (t_row < row && t_col < col) {
        for (let i = row - 1; i > t_row; i--) {
          if (--col > t_col) {
            if ($("[row=" + i + "][col=" + col + "]").attr("player") != "") {
              return false
            }
          }
        }
        return true
      } else if (t_row > row && t_col < col) {
        for (let i = row + 1; i < t_row; i++) {
          if (--col > t_col) {
            if ($("[row=" + i + "][col=" + col + "]").attr("player") != "") {
              return false
            }
          }
        }
        return true
      }
    } else {
      return false
    }
  }

  /*Returns true if the selected queen in currentPieceSel can move to t_row, t_col coordinates*/
  function queenCanMove(t_row, t_col) {
    if (rookCanMove(t_row, t_col) || bishopCanMove(t_row, t_col)) {
      return true
    } else {
      return false
    }
  }

  /*Returns true if the selected king in currentPieceSel can move to t_row, t_col coordinates*/
  function kingCanMove(t_row, t_col) {
    let row = currentPieceSel.row
    let col = currentPieceSel.col
    if ((Math.abs(t_row - row) == 1 && Math.abs(t_col - col) == 1) || (Math.abs(t_row - row) == 1 && t_col == col) || (Math.abs(t_col - col) == 1 && t_row == row)) {
      return true
    } else {
      return false
    }
  }
  /*After checking if it is possible to move the piece to a blank space, call this function to
  update the piece in currentPieceSel to t_row, t_col coordinates*/
  function movePiece(t_row, t_col) {
    $("[row=" + t_row + "][col=" + t_col + "]").attr("piece", currentPieceSel.piece)
    $("[row=" + t_row + "][col=" + t_col + "]").attr("player", currentPieceSel.player)
    $("[row=" + t_row + "][col=" + t_col + "]").css("background", "url(./Pieces/" + currentPieceSel.player + "/" + currentPieceSel.piece + ".png)")
    if (currentPieceSel.piece == "pawn") {
      var size = "65px"
    } else {
      var size = "74px"
    }
    let color = $("[row=" + t_row + "][col=" + t_col + "]").css("background-color")
    $("[row=" + t_row + "][col=" + t_col + "]").css("background-size", size)
    $("[row=" + t_row + "][col=" + t_col + "]").css("background-position", "center")
    $("[row=" + t_row + "][col=" + t_col + "]").css("background-repeat", "no-repeat")
    $("[row=" + t_row + "][col=" + t_col + "]").css("background-color", color)

    $("[row=" + currentPieceSel.row + "][col=" + currentPieceSel.col + "]").attr("piece", "")
    $("[row=" + currentPieceSel.row + "][col=" + currentPieceSel.col + "]").attr("player", "")
    $("[row=" + currentPieceSel.row + "][col=" + currentPieceSel.col + "]").css("background", "none")
    if ($("[row=" + currentPieceSel.row + "][col=" + currentPieceSel.col + "]").hasClass("square-white")) {
      color = "white"
    } else {
      color = "#5e2129"
    }
    $("[row= " + currentPieceSel.row + "][col = " + currentPieceSel.col + "]").css("background-color", color)

    currentPieceSel = {
      player: "",
      piece: "",
      row: "",
      col: ""
    }
    if (turn == "white") {
      turn = "black"
    } else {
      turn = "white"
    }
  }
});