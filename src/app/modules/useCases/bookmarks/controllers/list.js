define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller('BookmarksListCtrl', BookmarksListCtrl);

  BookmarksListCtrl.$inject = [
    '$rootScope', '$scope', '$location',
    'BookmarksResource', 'PaginationFactory', 'InputFocusFactory',
    '$log'
  ];

  function BookmarksListCtrl(
    $rootScope, $scope, $location,
    resource, pagination, input, console
  ) {

    var ctrlName = 'BookmarksListCtrl';
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
    vm.optionsBtnLabel = 'Mostrar Opções';
    vm.showOptionsBtnClick = showOptionsBtnClick;
    vm.filter = { search: '' };
    vm.showFilter = false;
    vm.showFilterBtn = false;
    vm.showFilterBtnActive = false;
    vm.filterBtnLabel = 'Mostrar filtros';
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

    function updateLocation() {
      $location.path('/bookmarks');
    }

    $rootScope.$on('bookmarks:add:event', function(event, value) {
      event.preventDefault(); event.stopPropagation();
      pagination.addCheck();
      updateLocation();
    });

    $rootScope.$on('bookmarks:update:event', function(event, value) {
      event.preventDefault(); event.stopPropagation();
      updateLocation();
    });

    $rootScope.$on('bookmarks:remove:event', function(event, value) {
      event.preventDefault(); event.stopPropagation();
      pagination.removeCheck();
      updateLocation();
    });

    input.config(
      $scope,
      [
        'focusPageSizeInput',
        'focusFilterSearchInput'
      ]);

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
    }

    function loadData(page) {
      resource.get({page: page, size: pagination.getPageSize()},
        function(result) {
          vm.result = result;
          vm.currentPage = result.page;
          pagination.updateMetainf(result.count, result.data.length, result.page, result.pages);
          updateInterface();
        }
      );
    }

    loadData(pagination.getNextPage());

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

        input.focusReset();
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
      if(!vm.updatePageSizeInvalid(vm.pageSize))
        vm.updatePageSize();
    }
  }

});
