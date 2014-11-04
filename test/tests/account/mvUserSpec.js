/**
 * Created by AntonyBaasan on 14-11-03.
 */

describe('mvUser', function(){
    beforeEach(module('app'));

    describe('isAdmin', function(){
        it('if the roles array does not have an admin entry', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.false;
        }));

        it('should return true if the roles array has an admin entry', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }));
    })
})