define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/search');

  module.controller('BookmarksSearchCtrl', BookmarksSearchCtrl);

  BookmarksSearchCtrl.$inject = [
    '$scope', 'BookmarksSearchResource',
    'PaginationFactory', 'InputFocusFactory',
    '$log'
  ];

  function BookmarksSearchCtrl($scope, resource, pagination, input, console) {

    var ctrlName = 'BookmarksSearchCtrl';
    input = input.get(ctrlName);
    pagination = pagination.get(ctrlName);
    var config = {
      pageMinSize: 2,
      pageMaxSize: 50,
      showFilterBtnMinlength: 5
    };

    var vm = this;
    vm.result = undefined;
    vm.currentPage = undefined;
    vm.showOptions = false;
    vm.optionsBtnLabel = 'Show Options';
    vm.showOptionsBtnClick = showOptionsBtnClick;
    vm.filter = { search: '' };
    vm.showFilter = false;
    vm.showFilterBtn = false;
    vm.showFilterBtnActive = false;
    vm.filterBtnLabel = 'Show filter';
    vm.showFilterBtnClick = showFilterBtnClick;
    vm.clearFilter = clearFilter;
    vm.showPagination = true;
    vm.pageSize = pagination.getPageSize();
    vm.pageMinSize = config.pageMinSize;
    vm.pageMaxSize = config.pageMaxSize;
    vm.paginationItemsSize = 5;
    vm.paginationPageSize = pagination.getPageSize();
    vm.currentPage = 1;
    vm.pageChanged = PageChanged;
    vm.updatePageSizeInvalid = updatePageSizeInvalid;
    vm.updatePageSize = updatePageSize;
    vm.updatePageSizeFormSubmit = updatePageSizeFormSubmit;

    vm.doSearch = doSearch;

    input.config(
      $scope,
      [
        'focusSearchInput',
        'focusPageSizeInput',
        'focusFilterSearchInput'
      ]);

    input.setFocus('focusSearchInput', 200);

    function stringEmpty(str) {
      var pattern = /^\s*$/;
      return (str === null || pattern.test(str));
    }

    function updateInterface() {
      vm.clearFilter();
      if(vm.showOptions) vm.showOptionsBtnClick();
      if(vm.showFilter || vm.showFilterBtnActive) vm.showFilterBtnClick();

      vm.showFilterBtn = checkShowfilterBtn();
      vm.showPagination = true;
      vm.showFilter = false;
      vm.showFilterBtnActive = false;
      input.setFocus('focusSearchInput');
    }

    function loadData(page) {
      if(!stringEmpty(vm.searchName)) {
        resource.get({name: vm.searchName, page: page, size: pagination.getPageSize()},
          function(result) {
            vm.result = result;
            vm.currentPage = result.page;
            pagination.updateMetainf(result.count, result.data.length, result.page, result.pages);
            updateInterface();
          }
        );
      }
    }

    function showOptionsBtnClick() {
      vm.showOptions = !vm.showOptions;
      vm.optionsBtnLabel = (vm.showOptions ? 'Esconder' : 'Mostrar') + ' opções';
      if(vm.showOptions) {
        vm.showFilter = vm.showFilterBtnActive;
        if(vm.showFilter) input.setFocus('focusFilterSearchInput');
        else input.setFocus('focusPageSizeInput');
      } else {
        if(vm.showFilter && stringEmpty(vm.filter.search)) vm.showFilterBtnClick();
        vm.showFilter = false;
        input.setFocus('focusSearchInput');
      }
    }

    function checkShowfilterBtn() {
      return (
        (pagination.getPageSize() >= config.showFilterBtnMinlength) &&
        (pagination.metainf.lastPageSize >= config.showFilterBtnMinlength)
      );
    }

    function showFilterBtnClick() {
      vm.showFilter = vm.showFilterBtnActive = !vm.showFilter;
      vm.filterBtnLabel = (vm.showFilter ? 'Hide' : 'Show') + ' filter';
      if(!vm.showFilter) vm.clearFilter();
      vm.showPagination = !vm.showFilter;

      if(vm.showFilter) input.setFocus('focusFilterSearchInput');
      else input.setFocus('focusPageSizeInput');
    }

    function clearFilter() {
      vm.filter = { search: '' };
    }

    function PageChanged() {
      if(vm.currentPage != vm.result.page) {
        pagination.setNextPage(vm.currentPage);
        loadData(pagination.getNextPage());
      }
    }

    function updatePageSizeInvalid(pageSize) {
      var flag = false;
      flag = (
        pageSize === undefined ||
        pageSize === null ||
        pageSize === pagination.getPageSize() ||
        pageSize < vm.pageMinSize ||
        pageSize > vm.pageMaxSize
      );

      return flag;
    }

    function updatePageSize() {
      if(vm.showFilter) vm.showFilterBtnClick();
      pagination.resetPageSize(vm.pageSize);
      vm.paginationPageSize = pagination.getPageSize();
      loadData(pagination.getNextPage());
    }

    function updatePageSizeFormSubmit() {
      if(!vm.updatePageSizeInvalid(vm.pageSize)) {
        vm.updatePageSize();
      }
    }
    function doSearch() {
      pagination.resetPageSize(vm.pageSize);
      loadData(pagination.getNextPage());
    }

  }

});
