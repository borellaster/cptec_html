    /*vm.pageChanged = function() {
      pagination.setNextPage(vm.result.page);
      vm.loadData(pagination.getNextPage());
    } */   

    /*vm.loadData = function (page) {
      var latitude = 0;
      var longitude = 0;
      if(vm.requisicao.tipoConsulta.val == "CI"){
        latitude = vm.requisicao.city.latitude;
        longitude = vm.requisicao.city.longitude;
      }else if(vm.requisicao.tipoConsulta.val == "CO"){
        latitude = vm.requisicao.latitude;
        longitude = vm.requisicao.longitude;
      }      
      dataService.listpag(longitude, latitude, getVariables(), 
                          vm.requisicao.start_month.month,
                          vm.requisicao.start_year.year, 
                          vm.requisicao.end_month.month,
                          vm.requisicao.end_year.year,                           
                          vm.requisicao.model.id, page, 5)
        .then(function success(result) {
        vm.result = result;    
        vm.currentPage = result.page;
        pagination.updateMetainf(
          result.count,
          result.length,
          result.page,
          result.pages
        );              
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      });      
    }*/