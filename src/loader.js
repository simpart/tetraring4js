/**
 * @file   loader.js
 * @brief  loader of html,js,css file
 * @author simpart
 * @note   MIT license
 */

/*** Global ***/
var Gcom_loadJscnt    = new Array( 7 );
var Gcom_loadList     = new Array();
var Gcom_loadPathList = new Array();
var Gcom_loadChkr     = null;

/*** initial ***/
$(function() {
  var loop = 0;
  for( loop=0 ; loop < Gcom_loadJscnt.length ; loop++ ) {
    Gcom_loadJscnt[loop] = 0;
  }
});

/*** function ***/
/**
 * @briad parallel javascript loader
 * @param[in] paths : target javascript file paths
 * @param[in] func : function call after loaded
 */
function Fcom_loadJs( paths , func , prm ) {
  try {
    /* param check */
    if( (null == paths) || (paths.length == 0) ) {
      return true;
    }
    var pval = prm || null;
    
    if ( 0 == Gcom_loadJscnt[0] ) {
      Fcom_loadJsElem( 0 , paths , func , pval );
    } else if( 0 == Gcom_loadJscnt[1] ) {
      Fcom_loadJsElem( 1 , paths , func , pval );
    } else if( 0 == Gcom_loadJscnt[2] ) {
      Fcom_loadJsElem( 2 , paths , func , pval );
    } else if( 0 == Gcom_loadJscnt[3] ) {
      Fcom_loadJsElem( 3 , paths , func , pval );
    } else if( 0 == Gcom_loadJscnt[4] ) {
      Fcom_loadJsElem( 4 , paths , func , pval );
    } else if( 0 == Gcom_loadJscnt[5] ) {
      Fcom_loadJsElem( 5 , paths , func , pval );
    } else if( 0 == Gcom_loadJscnt[6] ) {
      Fcom_loadJsElem( 6 , paths , func , pval );
    } else {
      throw new Error('burst js loading stack.');
    }
  } catch( e ) {
    throw new Error( e.stack );
  }
}

function Fcom_loadJsElem( idx , paths , func , pval ) {
  try {
    Gcom_loadJscnt[idx] = paths.length;

    var chk_flg = false;
    for( var p_idx in paths ) {
      chk_flg = false;
      for( var c_idx in Gcom_loadPathList ) {
        if( paths[p_idx] == Gcom_loadPathList[c_idx] ) {
          chk_flg = true;
          break;
        }
      }
      if( true == chk_flg ) {
        Gcom_loadJscnt[idx]--;
        continue;  // already loaded , next js
      }
      // js load
      Gcom_loadPathList.push( paths[p_idx] );
      var cnt_idx = idx;
      $.getScript( paths[p_idx] ,
                   function(src,sts,obj) {
                     try {
                       Gcom_loadJscnt[cnt_idx]--;
                     } catch( e ) {alert( e.stack );}
                   }
                 );
    }
    Fcom_waitJs( idx , func , pval );
  } catch( e ) {
    throw new Error( e.stack );
  }
}

function Fcom_waitJs( idx , func , pval ) {
  try {
    //alert( func );
    if( 0 == Gcom_loadJscnt[idx] ) {
      if( null != func ) {
        if ( null == pval ) {
          func();
        } else {
          func( pval );
        }
      }
      return;
    } else {
      //alert( Gcom_loadJscnt[idx] );
      //Fcom_printObj( Gcom_loadJscnt );
    }
    setTimeout( function ( p1 ,p2, p3 ) {
      try {
        Fcom_waitJs( p1 , p2 , p3 );
      } catch ( e ) {
        alert( e.stack );
      }
    } , 200 , idx , func , pval );
  } catch( e ) {
    alert( e.stack );
  }
}

/**
 * @brief load css
 * @param path to target css
 */
function Fcom_loadCss( path ) {
  try {
    $('head').append('<link>');
    css = $('head').children(':last');
    css.attr({
      rel:  'stylesheet',
      type: 'text/css',
      href: path
    });
  } catch( e ) {
    throw new Error( e.stack );
  }
}
/**
 * @brief load html
 * @param hpath : path to html file
 * @param h_id : insert the destination html tag id
 * @param func : function after load
 */
function Fcom_loadHtml( h_path , h_id , func ) {
  try {
    $.ajax({
      url         : h_path ,
      type        : 'GET'  ,
      cache       : false  ,
      dataType    : 'html' ,
      async       : false
    })
    .done(function( jqXHR, textStatus, errorThrown ) {
      $( '#' + h_id ).html( jqXHR );
      if( null != func ) {
        func( jqXHR );
      }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      throw new Error();
    })
    .always(function( data, textStatus, errorThrown ) {});
  } catch( e ) {
    throw new Error( e.stack );
  }
}

/**
 * @brief
 * @param name : load name
 */
function Fcom_startLoad( name ) {
  try {
    if( true == (name in Gcom_loadList) ) {
      throw new Error( name + ' is already loaded' );
    }
    Gcom_loadList[name] = false;
  } catch( e ) {
    throw new Error( e.stack );
  }
}
/**
 * @brief
 * @param name : load name
 */
function Fcom_endLoad( name ) {
  try {
    if( false == (name in Gcom_loadList) ) {
      throw new Error( name + ' does not load' );
    }
    Gcom_loadList[name] = true;
  } catch( e ) {
    throw new Error( e.stack );
  }
}
/**
 * @brief wait load finished and fire callback function
 * @param target : target load name
 * @param func : callback function
 */
function Fcom_fireLoadev( target , func ) {
  try {
    var chk_flg = false;
    var hit     = false;

    for ( var idx in target ) {
      hit = false;
      for ( var load in Gcom_loadList ) {
        if( target[idx] == load ) {
          hit = true;
          if( true !== Gcom_loadList[load] ) {
            chk_flg = true;
            break;
          }
        }
      }
      if( (hit == false) || (true === chk_flg) ) {
        setTimeout(
          function(p1,p2) {
            try{ Fcom_fireLoadev( p1 , p2 ); }
            catch(e){alert(e.stack);}
          },
          200,
          target,
          func
        );
        return;
      }
    }
    if( null != func ) {
      func();
    }
  } catch( e ) {
    throw new Error( e.stack );
  }
}
