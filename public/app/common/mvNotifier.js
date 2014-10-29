/**
 * Created by AntonyBaasan on 14-10-29.
 */
angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(toastr){
    return{
        notify:function(msg){
            mvToastr.success(msg);
            console.log(msg);
        }
    };
});
