<?php

namespace app\index\controller;

use think\Controller;
use app\common\Response;
use think\Exception;
use app\index\model\File;

class Upload extends Controller
{
    public function index($paging)
    {
        try {
            $file = new File();
            $fileList = $file->getList($paging);
            $paging['total'] = File::Count($paging['typeName'], $paging['type']);
            return Response::result(201, "成功!", "文件列表获取成功!", $fileList, $paging);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    public function add($aid = -1)
    {
        try {
            $files = request()->file();
            if (empty($files)) {
                return Response::result(400, "失败!", "请上传文件!");
            }
            foreach ($files as $file) {
                // 移动到框架应用根目录/public/uploads/ 目录下
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
                if ($info) {
                    $file = new File();
                    $file->name = $info->getInfo()["name"];
                    $file->type = $info->getInfo()["type"];
                    $file->size = $info->getInfo()["size"];
                    $file->datetime = date('Y-m-d H:i:s');
                    $file->aid = $aid;
                    if ($aid == -1) {
                        $file->status = 1;
                    } else if ($aid == -2) {
                        $file->status = 2;
                    } else {
                        $file->status = 0;
                    }
                    $file->url = str_replace("\\", "/", $info->getSavename());
                    $file->add();
                    $fileList = $file->getList(['typeName' => 'id', 'type' => $aid]);
                    return Response::result(201, "成功!", "上传成功!", ['file' => $file, 'fileList' => $fileList]);
                } else {
                    return Response::result(400, "失败!", $file->getError());
                }
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    public function del($fid)
    {
        try {
            $file = new File();
            foreach ($fid as $value) {
                $filename = '../api/public/uploads/' . File::get($value)->url;
                $file->del($value);
                if (file_exists($filename)) {
                    unlink($filename);
                    $info = Response::result(201, "成功!", "文件删除成功!");
                } else {
                    return Response::result(400, "成功!", "某个文件删除失败，请前往服务器目录清理!");
                }
            }
            return $info;
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}